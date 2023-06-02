import { ReadInfo, getParams } from "./modules/H4OInfo";
var div = document.getElementById("myDiv");
var table = document.createElement("table");
const selectedParams = []
var select = document.getElementById("satellite");
const paramSelectInput = document.getElementById("paramSelect");
const suggestions = document.getElementById("suggestions");


ReadInfo()
    .then(satellites => {
        console.log("satellites en el otro", satellites)
        satellites.forEach(function (satellite) {
            var option = document.createElement("option");
            option.text = satellite;

            select.add(option);
        });
    })
    .catch(error => {
        console.error(error);
    });

select.addEventListener("change", function () {
    const satelliteName = select.value;
    getParams(satelliteName)
        .then(params => {
            console.log("Parámetros:", params);
            for (var i = 0; i < params.length; i++) {
                var row = document.createElement("tr");
                var cell = document.createElement("td");
                cell.textContent = params[i];

                cell.addEventListener("click", function () {
                    this.classList.toggle("selected");
                    selectedParams.push(cell.textContent);
                });

                row.appendChild(cell);
                table.appendChild(row);
            }
            div.appendChild(table);

        })
        .catch(error => {
            console.error(error);
        });
});






paramSelectInput.addEventListener("keydown", function (event) {

    console.log("No Backspace")
    const searchTerm = paramSelectInput.value.trim();
    const availableParameters = Array.from(table.querySelectorAll("td")).map(
        (cell) => cell.textContent
    );

    // Encontrar el primer parámetro disponible que coincide con el término de búsqueda
    const matchingParameter = availableParameters.find((parameter) =>
        parameter.toLowerCase().startsWith(searchTerm.toLowerCase())
    );
    console.log("matchingParameter", matchingParameter)
    // Mostrar la sugerencia en el input paramSelect
    if (matchingParameter) {
        const remainingCharacters = matchingParameter.slice(searchTerm.length);
        console.log(remainingCharacters)
        paramSelectInput.value = searchTerm + remainingCharacters;
        paramSelectInput.setSelectionRange(searchTerm.length, paramSelectInput.value.length);
    }

});

