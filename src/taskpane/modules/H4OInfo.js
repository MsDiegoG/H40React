
import { SatellitesQuery, ParametersQuery, LevelsQuery, BuildServiceAddress } from './H4OSvc';



export const ReadInfo = () => {
    return new Promise((resolve, reject) => {
        const satellites = [];
        try {
            const headers = {
                'X-Requested-With': 'XMLHttpRequest'
            };
            const hostLS = localStorage.getItem('host');
            const portLS = localStorage.getItem('port');
            console.log("hostLS", hostLS);
            console.log("portLS", portLS);
            fetch(SatellitesQuery(hostLS, portLS), { headers })
                .then(response => response.text())
                .then(html => {
                    const tempElement = document.createElement('div');
                    tempElement.innerHTML = html;
                    const satelliteRows = tempElement.querySelectorAll('table tr');
                    const sats = Array.from(satelliteRows).map(row => row.querySelector('td').textContent);
                    sats.forEach(sat => {
                        satellites.push(sat);
                    });
                    Office.initialize = function (reason) {
                        console.log("Office.initialize")
                        // El código aquí se ejecutará cuando Office.js esté inicializado

                        if (reason === Office.InitializationReason.DocumentOpened) {
                            // Este código se ejecutará cuando se abra un documento de Excel

                            // Aquí puedes llamar a tu función enableGetTMbutton() u otras operaciones relacionadas con el complemento
                            enableGetTMbutton();
                        }
                    };

                    resolve(satellites)
                })
                .catch(error => {
                    console.error("Error:", error);
                    reject(error);
                });

        } catch (error) {
            console.error("Error " + error.code + ": " + error.message);
            reject(error);
        }
    });
};
// const host = "demo-swarm"
// const port = 7000

export const getParams = (satelliteName) => {
    return new Promise((resolve, reject) => {
        try {
            const hostLS = localStorage.getItem('host');
            const portLS = localStorage.getItem('port');
            fetch(ParametersQuery(hostLS, portLS, satelliteName))
                .then(response => response.text())
                .then(html => {

                    const params = parseParamsFromHTML(html);

                    resolve(params);
                })
                .catch(error => {
                    console.error("Error:", error);
                    reject(error);
                });
        } catch (error) {
            console.error("Error:", error);
            reject(error);
        }
    });
};

const parseParamsFromHTML = (html) => {
    const params = [];
    const tempElement = document.createElement('div');
    tempElement.innerHTML = html;
    const paramRows = tempElement.querySelectorAll('table tr');

    for (let i = 0; i < paramRows.length; i++) {
        const paramData = paramRows[i].querySelector('td');
        if (paramData) {
            const param = paramData.textContent;
            params.push(param);
        }
    }

    return params;
};
const enableGetTMbutton = async () => {
    console.log("enableGetTMbutton");

    await Office.onReady();

    if (Office.context.mailbox) {
        const runtimeId = Office.context.mailbox.diagnostics.hostName;
        const reasons = Office.Runtime.UpdateReason.Registered;

        Office.runtime.requestUpdate({
            addinId: runtimeId,
            reasons: reasons
        });

        const button = { id: "TaskpaneButton2", enabled: true };
        const parentGroup = { id: "CommandsGroup2", controls: [button] };
        const parentTab = { id: "H4O.Tab", groups: [parentGroup] };
        const ribbonUpdater = { tabs: [parentTab] };
        console.log(ribbonUpdater);
        Office.ribbon.requestUpdate(ribbonUpdater);
    } else {
        console.log("Office.context is undefined.");
    }
};


//for (sat of sats.resultRange.cells.values) {
//   // Put the parameters list for a satellite in the meta info worksheet
//   if (sat[0] !== "") {
//     params = info.queryTables.add("URL;" + ParametersQuery(host, port, sat[0]), info.getRange("D1"));
//     params.name = ParamsTableName(sat[0]);
//     params.backgroundQuery = false;
//     params.refresh();

//     // Put the levels list for a satellite in the meta info worksheet
//     levels = info.queryTables.add("URL;" + LevelsQuery(host, port, sat[0]), info.getRange("D1"));
//     levels.name = LevelsTableName(sat[0]);
//     levels.backgroundQuery = false;
//     levels.refresh();
//   }
// }

// Everything is ok until now. Replace the old worksheet with the new.
// ForceDeleteWorksheet(INFO_SHEET_NAME);
// info.name = INFO_SHEET_NAME;

