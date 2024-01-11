 #!/bin/bash

pnpm run build
sudo rm -R /home/deck/homebrew/plugins/LegionGoRefreshRate/
sudo cp -R /home/deck/Development/LegionGoRefreshRate/ /home/deck/homebrew/plugins/
sudo systemctl restart plugin_loader.service
