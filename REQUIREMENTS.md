Build a module that is able to scan visual data matrices (similar to QR-Codes) in order to read a patients standardized medication plan. Have a look at our current implementation at: https://somn.io/files/sample/scanner_demo.mp4

A sample medication plan containing a data matrix that encodes the information can be found at: https://somn.io/files/sample/sample_plan.pdf. You can have a look at the specification, but that should not be necessary: https://www.kbv.de/media/sp/Medikationsplan_Anlage3.pdf. 
 
The requirements are:

1. Build the module using angular v15 (or react/vue) you can use the CLI. The way you structure and orchestrate components is up to you.
2. Your module should contain three components/views:

                1. A start screen with a title/description
                2. A screen displaying a camera view that can scan the visual data matrix
                3. A screen that displays the information extracted from the medical plan (can be very basic)

3. You will not have to implement the image analysis yourself - look for suitable libraries on NPM, same goes for the XML parsing etc.
4. You can neglect design - your implementation doesn't have to look pretty.
5. Send me your code through a link to your Github/Gitlab repo. (if not possible a ZiP file will do as well, just exclude the node_modules folder)