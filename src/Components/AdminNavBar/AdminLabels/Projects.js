import React from "react";

const Projects = () =>{

    return(
        <>
        <div>
            hiii
Launch the Tool 
------------------
/proj/xbuilds/2023.2_daily_latest/installs/lin64/Vitis/2023.2/bin/vitis

Hardwares:
designs: zinc------zc702,706--------processors: a90,a91(cortex)
designs: zincmp----zcu106,102-------processors: a530,a531,a532,a533,R50,R51
designs: versal----vck190,vmk180----processors: a720,a721,a722,a723,R50,R51

linux
windows
ubuntu

baremetal a without os we can debug the app.

acquire the board
--------------------
setenv PATH /bin:$PATH
/proj/systest/bin/systest (boardtext)
loadmodule "2023.2_daily_latest"
hw_server
connect (serial ports)



rigel r vitis IDE
unified and classic
kernals


xhdkmeesala40x 
xhdkmeesala41x



vs code
-----------

For Run the test cases
-----------------------
yarn ui-tests -g [filename] --headed

` = grave, grave accent, backtick, back quote



launch the tool in browser:
-------------=  bash-4.2$ export PATH=/tools/batonroot/rodin/engkits/lnx64/node-14.19.0/bin:/tools/batonroot/rodin/engkits/lnx64/node-14.19.0/lib/node_modules/yarn/bin/:$PATH

To set node
-------------
setenv PATH /tools/batonroot/rodin/engkits/lnx64/node-14.19.0/bin:/tools/batonroot/rodin/engkits/lnx64/node-14.19.0/lib/node_modules/yarn/bin/:$PATH


Copy file
-------------
cp -rf source destination

to give an access for modify
-----------------------------
chmod 777 hls_config.cfg


background kill
-----------------
ps -aef | grep xbuilds,vitis
Kill -9 1234


netstat -tupln
after this use kill  to kill particular server
pkill node
pkill code




const KERNEL_IMAGE_PATH = "/proj/xbuilds/2024.1_daily_latest/internal_platforms/sw/versal/xilinx-versal-common-v2024.1/Image"
const ROOTFS_PATH = "/proj/xbuilds/2024.1_daily_latest/internal_platforms/sw/versal/xilinx-versal-common-v2024.1/rootfs.ext4"
const SYSROOT_PATH = "/proj/xbuilds/2024.1_daily_latest/internal_platforms/sw/versal/xilinx-versal-common-v2024.1/sysroots/aarch64-xilinx-linux"




To Create A sesson
-------------------------
vncserver -geometry 1080x920



To know version of linux os
-----------------------------
cat /etc/centos-release
CentOS Linux release 7.7.1908 (Core)

lsb_release -a


To know the storage
-----------------------
df -h
df -urrent folder 




To install VSCode in linux
-----------------------------
/tools/xgs/bin/sudo apt-get update
if(apt-get: command not found)
then
/tools/xgs/bin/sudo yum update
/tools/xgs/bin/sudo yum install code




Perforce path
--------------
/wrk/xhdhdnobkup3/kmeesala/RDI_canary/kmeesala_xhdkmeesala41x_1830/xtc/REL/2024.1/tc/open/scout/embedded/Rigel_tool/gui_tests




To open perforce window
--------------------------
 
/tools/batonroot/rodin/devkits/lnx32/perforce-2013.1/bin/p4v


kishore perforce workspace
 
/wrk/xhdhdnobkup3/kmeesala/RDI_canary/kmeesala_xhdkmeesala41x_1830/xtc/REL/2024.1/tc/open/scout/embedded/Rigel_tool/gui_tests/common/



(RUN.sh)
-------------------------------------------------------------------------------------------------------------
export CURDIR=`pwd`
echo "Current directory is" $CURDIR
export PLATFORM_REPO_PATHS=/proj/xbuilds/2024.1_daily_latest/internal_platforms
export XILINX_VITIS_DATA_DIR=$CURDIR/config_area
export YARN_CACHE_FOLDER=./cache
export PATH=/tools/batonroot/rodin/engkits/lnx64/node-14.19.0/bin:/tools/batonroot/rodin/engkits/lnx64/node-14.19.0/lib/node_modules/yarn/bin/:$PATH
echo "Copying the test data to testcase folder"
cp -rf /proj/testcases/xtc/HEAD/tc/open/scout/embedded/Rigel_tool/gui_tests/common/scripts/system-test-seed/ .
cd system-test-seed
mkdir tests
cp -rf /proj/testcases/xtc/HEAD/tc/open/scout/embedded/Rigel_tool/gui_tests/common/scripts/AIE_Template_creation.test.ts tests/
cp -rf ../input.csv tests/
echo "Copying of test data is completed"
export PLAYWRIGHT_BROWSERS_PATH=$CURDIR/system-test-seed
rm chromium-1005
ln -s /tools/batonroot/rodin/engkits/lnx64/chromium-1005/ .
rm node_modules
ln -s /proj/testcases/xtc/HEAD/tc/open/scout/embedded/Rigel_tool/gui_tests/common/node_modules/ .
#ln -s /proj/xtools/dsv/rigel_gui_test_nodemodules/HEAD/node_modules/ .
#npx playwright test --config=./configs/playwright.headless.config.ts
node_modules/playwright-core/cli.js test --config=./configs/playwright.headless.config.ts
node_modules/allure-commandline/bin/allure generate ./allure-results --clean -o allure-results/allure-report






 also for software emulation build we can use this because xrt source we are doing (2nd line in this script)
if we don't want xrt source we can remove that line
---------------------------------------------------------------------------------------------------------------------------
#!/bin/bash
export CURDIR=`pwd`
source /proj/xbuilds/2024.1_daily_latest/xbb/xrt/packages/setenv.sh
echo "Current directory is" $CURDIR
export PLATFORM_REPO_PATHS=/proj/xbuilds/2024.1_daily_latest/internal_platforms
export XILINX_VITIS_DATA_DIR=$CURDIR/config_area
export YARN_CACHE_FOLDER=./cache
export PATH=/tools/batonroot/rodin/engkits/lnx64/node-14.19.0/bin:/tools/batonroot/rodin/engkits/lnx64/node-14.19.0/lib/node_modules/yarn/bin/:$PATH
echo "Copying the test data to testcase folder"
cd system-test-seed
export PLAYWRIGHT_BROWSERS_PATH=$CURDIR/system-test-seed
rm chromium-1005
ln -s /tools/batonroot/rodin/engkits/lnx64/chromium-1005/ .
rm node_modules
ln -s /proj/testcases/xtc/HEAD/tc/open/scout/embedded/Rigel_tool/gui_tests/common/node_modules/ .
#ln -s /proj/xtools/dsv/rigel_gui_test_nodemodules/HEAD/node_modules/ .
#npx playwright test --config=./configs/playwright.headful.config.ts
node_modules/playwright-core/cli.js test --config=./configs/playwright.headful.config.ts

            </div>
            
        </>
    );
}

export default Projects;