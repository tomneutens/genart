'use strict';
import BlocklyController from "./blockly_controller.js"
import CanvasController from "./canvas_controller.js"
import DataProcController from "./data_proc_controller.js";

let drawingOffset = 25;

let bController = new BlocklyController();
let cController = new CanvasController("artwork", drawingOffset);
let dpController = new DataProcController(cController.getWidth() - 2*drawingOffset, cController.getHeight() - 2*drawingOffset)
let canvasContainer = document.getElementById("canvasContainer");

// Attach resize observer to canvas
let resizeObserver = new ResizeObserver((entries) => {
  console.log(`Resized!`)
  for (let entry of entries){
    console.log(entry.contentBoxSize);
  }
  cController.setSize(canvasContainer.offsetWidth, canvasContainer.offsetHeight)
  cController.paint();
})

function main(){
  //resizeObserver.observe(canvasContainer);
  cController.setSize(canvasContainer.offsetWidth, canvasContainer.offsetHeight)
  bController.injectBlockly(".blockly")
  bController.addProgramChangedListener((distanceMatrix) => {
    let pointCloud = dpController.getPointCloudTSne(distanceMatrix);
    //let pointCloud = dpController.getPointCloud(distanceMatrix);
    cController.setPointCloudDataData(pointCloud);
    cController.paint();
  })
  cController.paint();
}

main();