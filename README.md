# Legion Go Refresh Rate - Decky Plugin

Experimental Decky Plugin for to change refresh rates and resolutions in SteamUI

If you need to manually revert the changes made by this plugin, you can do so by deleting the `$HOME/.config/environment.d/override-gamescopecmd.conf` file, this file is the only file that this plugin creates.

# WARNING! READ THIS

**When switching between refresh rates and resolutions, all your open games will be closed, and Steam will restart.**

**Make sure you save your game data first before swapping refresh rates!**

# Install Instructions

### Prerequisites

Decky Loader must already be installed.

Note that after the initial install, it may take a few attempts or reboots for it to start working.

### Quick Install / Update

Run the following in terminal, then reboot. Note that this works both for installing or updating the plugin

```
curl -L https://github.com/aarron-lee/LegionGoRefreshRate/raw/main/install.sh | sh
```

# Disclaimer

this workaround has not been heavily tested yet, so please be aware that you may encounter bugs
