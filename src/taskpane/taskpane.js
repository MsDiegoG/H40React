import { ReadInfo } from './modules/H4OInfo.js';
import { showErrorDialog } from './modules/H4O.js';


function getDecimalSeparator() {
  const n = 1.1;
  return n.toLocaleString().substring(1, 2);
}

const IsValidPort = (port) => {
  if (port.trim().length === 0) {
    return false;
  } else if (isNaN(port)) {
    return false;
  } else if (parseInt(port) !== parseFloat(port)) {
    return false;
  } else if (parseInt(port) < 0 || parseInt(port) > 65535) {
    return false;
  }

  return true;
}






const cmdConnect = (host, port) => {

  console.log("Valor de txtHost:", host);
  console.log("Valor de txtPort:", port);
  if (txtHost.value.trim().length === 0) {
    console.log("Host field is empty")
    showErrorDialog("Host field is empty");
    return;

  } else if (txtPort.value.trim().length === 0) {
    console.log("Port field is empty")

    showErrorDialog("Port field is empty");
    return;

  } else if (!IsValidPort(txtPort.value)) {
    console.log("The port field is not a number between 0 and 65535")

    showErrorDialog("The port field is not a number between 0 and 65535");
    return;

  } else {
    ReadInfo(txtHost.value.trim(), txtPort.value.trim());
  }

}
Office.onReady((info) => {
  if (info.host === Office.HostType.Excel) {
    document.getElementById("sideload-msg").style.display = "none";
    document.getElementById("app-body").style.display = "flex";
    document.getElementById("run").onclick = run;
  }
});

export async function run() {
  try {
    await Excel.run(async (context) => {

      const txtHostInput = document.getElementById('txtHost');
      const txtPortInput = document.getElementById('txtPort');
      const txtHostValue = txtHostInput.value;
      const txtPortValue = txtPortInput.value;
      cmdConnect(txtHostValue, txtPortValue)

      await context.sync();
    });
  } catch (error) {
    console.error(error);
  }
}

