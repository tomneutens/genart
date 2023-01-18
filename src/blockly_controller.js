import Blockly, { Block } from 'blockly';
import {javascriptGenerator} from 'blockly/javascript';
const Diff = require("diff")

class BlocklyController {

    workspace = null;
    prevCode = "";
    createdPrograms = [];
    distanceMatrix = [];
    programChangedListeners = [];
    toolbox = {
        "kind": "flyoutToolbox",
        "contents": [
            {
                "kind": "block",
                "type": "start"
            },
            {
                "kind": "block",
                "type": "loop"
            },
            {
                "kind": "block",
                "type": "if_else"
            },
            {
                "kind": "block",
                "type": "wait"
            },
            {
                "kind": "block",
                "type": "mercury"
            },
            {
                "kind": "block",
                "type": "venus"
            },
            {
                "kind": "block",
                "type": "earth"
            },
            {
                "kind": "block",
                "type": "mars"
            },
            {
                "kind": "block",
                "type": "jupiter"
            },
            {
                "kind": "block",
                "type": "saturn"
            },
            {
                "kind": "block",
                "type": "uranus"
            },
            {
                "kind": "block",
                "type": "neptune"
            },
            {
                "kind": "block",
                "type": "pluto"
            },
        ]
    }

    constructor(){
        this.defineCustomBlocks();
        this.defineCutsomBlockGenerators();
    }

    injectBlockly(blocklyDiv){
        this.workspace = Blockly.inject(blocklyDiv, {toolbox: this.toolbox, 
                                    css: true, 
                                    horizontalLayout: true,
                                    scrollbars: false,
                                    sounds: false,
                                    })
        this.workspace.addChangeListener((event) => {
            if (event.type == Blockly.Events.BLOCK_MOVE
                || event.type == Blockly.Events.BLOCK_CHANGE){
                let code = javascriptGenerator.workspaceToCode(this.workspace);
                if (code != this.prevCode){
                    this.createdPrograms.push(code); // Add to history
                    // Calculate the distances
                    this.updateProgramDistances(code);
                    this.prevCode = code;
                    this.notifyProgramChangedListeners();
                }
                
            }
        })
    }

    addProgramChangedListener(listener){
        this.programChangedListeners.push(listener)
    }

    notifyProgramChangedListeners(){
        this.programChangedListeners.forEach((listener) => {
            listener(this.distanceMatrix);
        })
    }

    updateProgramDistances(code){
        let newRow = []
        for (let rowIndex = 0 ; rowIndex < this.distanceMatrix.length ; rowIndex++){
            let newDistance = this.getTotalChangesBetweenPrograms(this.createdPrograms[rowIndex], code)
            this.distanceMatrix[rowIndex].push(newDistance)
            newRow.push(newDistance)
        }
        newRow.push(0)
        this.distanceMatrix.push(newRow)
        console.log("Distance matrix: ", this.distanceMatrix)
    }
    getTotalChangesBetweenPrograms(prog1, prog2){
        let textDiff = Diff.diffChars(prog1, prog2)
        let totalChanges = 0;
        textDiff.forEach((part) => {
            totalChanges += part.added ? part.count : part.removed ? part.count : 0;
        })
        console.log("Total change: ", totalChanges);
        return totalChanges
    }

    defineCustomBlocks() {
        Blockly.defineBlocksWithJsonArray([
            {
                "type": "start",
                "lastDummyAlign0": "CENTRE",
                "message0": "Start",
                "nextStatement": null,
                "colour": 300,
                "tooltip": "This is the root block of your program.",
                "helpUrl": ""
              },
              {
                "type": "loop",
                "message0": "loop %1 times %2 %3",
                "args0": [
                  {
                    "type": "field_number",
                    "name": "ITERATIONS",
                    "value": 5,
                    "min": 0,
                    "max": 10,
                    "precision": 1
                  },
                  {
                    "type": "input_dummy",
                    "align": "CENTRE"
                  },
                  {
                    "type": "input_statement",
                    "name": "LOOP_CONTENT"
                  }
                ],
                "previousStatement": null,
                "nextStatement": null,
                "colour": 300,
                "tooltip": "",
                "helpUrl": ""
              },
              {
                "type": "if_else",
                "message0": "if %1 then %2 %3 else %4 %5",
                "args0": [
                  {
                    "type": "field_checkbox",
                    "name": "IF_CONDITION",
                    "checked": true
                  },
                  {
                    "type": "input_dummy"
                  },
                  {
                    "type": "input_statement",
                    "name": "IF_CONTENT"
                  },
                  {
                    "type": "input_dummy"
                  },
                  {
                    "type": "input_statement",
                    "name": "ELSE_CONTENT"
                  }
                ],
                "previousStatement": null,
                "nextStatement": null,
                "colour": 300,
                "tooltip": "",
                "helpUrl": ""
              },
              {
                "type": "wait",
                "message0": "wait %1 seconds!",
                "args0": [
                  {
                    "type": "field_number",
                    "name": "WAIT_TIME",
                    "value": 10,
                    "min": 0,
                    "max": 42,
                    "precision": 1
                  }
                ],
                "previousStatement": null,
                "nextStatement": null,
                "colour": 300,
                "tooltip": "",
                "helpUrl": ""
              },
              {
                "type": "pluto",
                "message0": "Pluto",
                "colour": 60,
                "previousStatement": null,
                "nextStatement": null,
                "tooltip": "",
                "helpUrl": ""
              },
              {
                "type": "mars",
                "message0": "Mars",
                "colour": 15,
                "previousStatement": null,
                "nextStatement": null,
                "tooltip": "",
                "helpUrl": ""
              },
              {
                "type": "earth",
                "message0": "Earth",
                "colour": 225,
                "previousStatement": null,
                "nextStatement": null,
                "tooltip": "",
                "helpUrl": ""
              },
              {
                "type": "jupiter",
                "message0": "Jupiter",
                "colour": 75,
                "previousStatement": null,
                "nextStatement": null,
                "tooltip": "",
                "helpUrl": ""
              },
              {
                "type": "neptune",
                "message0": "Neptune",
                "colour": 210,
                "previousStatement": null,
                "nextStatement": null,
                "tooltip": "",
                "helpUrl": ""
              },
              {
                "type": "venus",
                "message0": "Venus",
                "colour": 30,
                "previousStatement": null,
                "nextStatement": null,
                "tooltip": "",
                "helpUrl": ""
              },
              {
                "type": "mercury",
                "message0": "Mercury",
                "colour": 0,
                "previousStatement": null,
                "nextStatement": null,
                "tooltip": "",
                "helpUrl": ""
              },
              {
                "type": "saturn",
                "message0": "Saturn",
                "colour": 50,
                "previousStatement": null,
                "nextStatement": null,
                "tooltip": "",
                "helpUrl": ""
              },
              {
                "type": "uranus",
                "message0": "Uranus",
                "colour": 180,
                "previousStatement": null,
                "nextStatement": null,
                "tooltip": "",
                "helpUrl": ""
              }
        ])
    }

    defineCutsomBlockGenerators(){
        javascriptGenerator['start'] = function(block) {
            // TODO: Assemble JavaScript into code variable.
            var code = 'start();\n';
            return code;
          };
        javascriptGenerator['loop'] = function(block) {
            var number_iterations = block.getFieldValue('ITERATIONS');
            var statements_loop_content = javascriptGenerator.statementToCode(block, 'LOOP_CONTENT');
            // TODO: Assemble JavaScript into code variable.
            var code = `for (let i = 0 ; i < ${number_iterations} ; ++i){
                ${statements_loop_content}
            };\n`;
            return code;
        };
        javascriptGenerator['if_else'] = function(block) {
            var checkbox_if_condition = block.getFieldValue('IF_CONDITION') === 'TRUE';
            var statements_if_content = javascriptGenerator.statementToCode(block, 'IF_CONTENT');
            var statements_else_content = javascriptGenerator.statementToCode(block, 'ELSE_CONTENT');
            // TODO: Assemble JavaScript into code variable.
            var code = `if (${checkbox_if_condition}) {
                ${statements_if_content}
            } else {
                ${statements_else_content}
            }\n`;
            return code;
          };
          javascriptGenerator['wait'] = function(block) {
            var number_wait_time = block.getFieldValue('WAIT_TIME');
            // TODO: Assemble JavaScript into code variable.
            var code = `wait(${number_wait_time});\n`;
            return code;
          };
          javascriptGenerator['mercury'] = function(block) {
            // TODO: Assemble JavaScript into code variable.
            var code = 'mercury();\n';
            return code;
          };
          javascriptGenerator['venus'] = function(block) {
            // TODO: Assemble JavaScript into code variable.
            var code = 'venus();\n';
            return code;
          };
          javascriptGenerator['earth'] = function(block) {
            // TODO: Assemble JavaScript into code variable.
            var code = 'earth();\n';
            return code;
          };
          javascriptGenerator['mars'] = function(block) {
            // TODO: Assemble JavaScript into code variable.
            var code = 'mars();\n';
            return code;
          };
          javascriptGenerator['jupiter'] = function(block) {
            // TODO: Assemble JavaScript into code variable.
            var code = 'jupiter();\n';
            return code;
          };
          javascriptGenerator['saturn'] = function(block) {
            // TODO: Assemble JavaScript into code variable.
            var code = 'saturn();\n';
            return code;
          };
          javascriptGenerator['uranus'] = function(block) {
            // TODO: Assemble JavaScript into code variable.
            var code = 'uranus();\n';
            return code;
          };
          javascriptGenerator['neptune'] = function(block) {
            // TODO: Assemble JavaScript into code variable.
            var code = 'neptune();\n';
            return code;
          };
          javascriptGenerator['pluto'] = function(block) {
            // TODO: Assemble JavaScript into code variable.
            var code = 'pluto();\n';
            return code;
          };
    }


}

export default BlocklyController