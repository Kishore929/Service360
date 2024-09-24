import React from "react";

const Projects = () => {

    return (
        <>
            <div>
                hiii
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