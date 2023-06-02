/*
 * Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 */

/* global console, document, Excel, Office */
Office.onReady()
  .then(function () {
    if (Office.context.host === Office.HostType.Excel) {
      document.getElementById("sideload-msg").style.display = "none";
      document.getElementById("app-body").style.display = "flex";
      document.getElementById("run").onclick = run;

      // Establecer el tamaño predeterminado de la ventana del panel de tareas
      // Office.context.ui.displayDialogAsync(window.location.origin + "/config.html", {
      //   height: 100,
      //   width: 50,
      //   displayInIframe: true,
      // });
    }
  })
  .catch(function (error) {
    console.error(error);
  });

export async function run() {
  try {
    await Excel.run(async (context) => {
      Office.ribbon.requestUpdate({
        tabs: [
          {
            id: "H4O.Tab",
            groups: [
              {
                id: "CommandsGroup1",
                controls: [
                  {
                    id: "TaskpaneButton",
                    enabled: true,
                  },
                ],
              },
            ],
          },
        ],
      });

      // const url = document.getElementById("urlInput").value;
      // const port = document.getElementById("portInput").value;

      // const selectedRange = context.workbook.getSelectedRange();
      // const currentCell = selectedRange.getCell(0, 0); // Celda seleccionada actualmente
      // const nextCell = selectedRange.getCell(0, 1); // Celda contigua a la celda seleccionada

      // currentCell.values = [[url]];
      // nextCell.values = [[port]];

      await context.sync();
      // console.log(`The range address was ${range.address}.`);
    });
  } catch (error) {
    console.error(error);
  }
}

/*global document, Office*/

// let _count = 0;

// Office.onReady(() => {
//   document.getElementById("sideload-msg").style.display = "none";
//   document.getElementById("app-body").style.display = "flex";

//   updateCount(); // Update count on first open.
//   Office.addin.onVisibilityModeChanged(function (args) {
//     if (args.visibilityMode === "Taskpane") {
//       updateCount(); // Update count on subsequent opens.
//     }
//   });
// });

// function updateCount() {
//   _count++;
//   document.getElementById("run").textContent = "Task pane opened " + _count + " times.";
// }
