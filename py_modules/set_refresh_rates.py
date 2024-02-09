import os
import subprocess
import decky_plugin
from enum import Enum

PLUGIN_USER = os.environ["DECKY_USER"]
CONF_FILE_LOCATION = f"/home/{PLUGIN_USER}/.config/environment.d/override-gamescopecmd.conf"

Resolutions = {
    'qHD': [1280, 800],
    'FHD': [1920, 1200],
    'native': [2560, 1600]
}

def set_60(resolution):
    try:
        os.mkdir(f'/home/{PLUGIN_USER}/.config/environment.d')
    except Exception as e:
        decky_plugin.logger.debug('directory already exists')
    
    file_contents = get_gamescope_override(refresh=60, resolution=resolution)
    
    try:
        with open(CONF_FILE_LOCATION, 'w') as file:
            file.write(file_contents)
            file.close()
    except Exception as e:
        decky_plugin.logger.info(e)
    
    result = subprocess.run(
        ["/usr/bin/steam", "-shutdown"],
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE, 
        text=True,
        user=PLUGIN_USER,
        cwd=f'/home/{PLUGIN_USER}'
    )

    if result.stderr:
        decky_plugin.logger.error(f"steam shutdown error: {result.stderr}")
        return False
    return True

def set_144(resolution):
    try:
        os.mkdir(f'/home/{PLUGIN_USER}/.config/environment.d')
    except Exception as e:
        decky_plugin.logger.debug('directory already exists')
    
    file_contents = get_gamescope_override(refresh=144, resolution=resolution)
    
    try:
        with open(CONF_FILE_LOCATION, 'w') as file:
            file.write(file_contents)
            file.close()
    except Exception as e:
        decky_plugin.logger.info(e)

    result = subprocess.run(
        ["/usr/bin/steam", "-shutdown"],
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE, 
        text=True,
        user=PLUGIN_USER,
        cwd=f'/home/{PLUGIN_USER}'
    )
    if result.stderr:
        decky_plugin.logger.error(f"steam shutdown error: {result.stderr}")
        return False
    return True



def get_gamescope_override(refresh, resolution):
    target_width, target_height = Resolutions[resolution]

    refresh_range = '' if refresh == 60 else '60,144'
    int_scale_str = ""
    # external_screen = ''

    if resolution != 'native':
        int_scale_str = f"-S integer -w {target_width} -h {target_height} -W 2560 -H 1600 "

    # external_screen = "--force-panel-type external --force-external-orientation left "
        
    refresh_str = '-r 60' if refresh == 60 else ''

    file_contents = f'export GAMESCOPECMD="$GAMESCOPECMD {int_scale_str} {refresh_str} "\
    \nexport STEAM_DISPLAY_REFRESH_LIMITS="{refresh_range}"\
    return file_contents