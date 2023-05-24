import { SatellitesQuery, ParametersQuery, LevelsQuery, BuildServiceAddress } from './H4OSvc';

export const ReadInfo = (host, port) => {

    try {
        console.log(SatellitesQuery(host, port))
        const headers = {
            'X-Requested-With': 'XMLHttpRequest'
        };
        let satellites = []
        fetch(SatellitesQuery(host, port), { headers })
            .then(response => response.text())
            .then(html => {
                const tempElement = document.createElement('div');
                tempElement.innerHTML = html;
                const satelliteRows = tempElement.querySelectorAll('table tr');
                const sats = Array.from(satelliteRows).map(row => row.querySelector('td').textContent);
                sats.forEach(sat => {
                    satellites.push(sat)
                });

                satellites.forEach(sat => {
                    console.log(sat)
                    fetch(ParametersQuery(host, port, sat), { headers })
                        .then(response => response.text())
                        .then(html => {
                            console.log("html", html)
                        })
                        .catch(error => {
                            console.error("Error:", error);
                        });




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


                });

            })
            .catch(error => {
                console.error("Error:", error);
            });


        console.log("satellites", satellites);


    } catch (error) {
        switch (error.code) {
            default:
                console.error("Error " + error.code + ": " + error.message);
        }

    }
}