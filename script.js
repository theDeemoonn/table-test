document.addEventListener("DOMContentLoaded", function () {
    const table1 = document.getElementById("table1");
    const tbody1 = table1.querySelector("tbody");
    const addRowButton = document.getElementById("addRow");

    function addRow() {
        const newRow = document.createElement("tr");
        newRow.innerHTML = `
            <td contenteditable="true">0</td>
            <td contenteditable="true">0</td>
            <td><button class="delete-button">Delete</button></td>
        `;

        const deleteButton = newRow.querySelector(".delete-button");
        deleteButton.addEventListener("click", function () {
            tbody1.removeChild(newRow);
        });

        tbody1.appendChild(newRow);
    }

    addRowButton.addEventListener("click", addRow);

    const table2 = document.getElementById("table2");
    const tbody2 = table2.querySelector("tbody");
    const addRowButton2 = document.getElementById("addRow2");

    function addRow2() {
        const newRow = document.createElement("tr");
        newRow.innerHTML = `
            <td contenteditable="true">0</td>
            <td contenteditable="true">0</td>
            <td><button class="delete-button">Delete</button></td>
        `;

        const deleteButton = newRow.querySelector(".delete-button");
        deleteButton.addEventListener("click", function () {
            tbody2.removeChild(newRow);
        });

        tbody2.appendChild(newRow);
    }

    addRowButton2.addEventListener("click", addRow2);

    const table3 = document.getElementById("table3");
    const tbody3 = table3.querySelector("tbody");
    const calculateButton = document.getElementById("calculate");








    function calculateTable3() {
        const rowsTable1 = tbody1.querySelectorAll("tr");
        const rowsTable2 = tbody2.querySelectorAll("tr");

        tbody3.innerHTML = "";

        for (let i = 0; i < Math.min(rowsTable1.length, rowsTable2.length); i++) {
            const rowTable1 = rowsTable1[i];
            const rowTable2 = rowsTable2[i];


            const x1 = parseFloat(rowTable1.querySelector("td:first-child").textContent);
            const y1 = parseFloat(rowTable1.querySelector("td:nth-child(2)").textContent);


            const x2 = parseFloat(rowTable2.querySelector("td:first-child").textContent);
            const y2 = parseFloat(rowTable2.querySelector("td:nth-child(2)").textContent);


            const x3 = (x1 + x2) / 2;
            const y3 = (y1 + y2) / 2;

            const newRow = document.createElement("tr");
            newRow.innerHTML = `
            <td>${x3.toFixed(2)}</td>
            <td>${y3.toFixed(2)}</td>
        `;

            tbody3.appendChild(newRow);
        }
    }


    calculateButton.addEventListener("click", calculateTable3);
    calculateButton.addEventListener("click", drawChart1);
    calculateButton.addEventListener("click", drawChart2);
    calculateButton.addEventListener("click", drawChart3);


    const chart1Canvas = document.getElementById("chart1");
    const chart1Ctx = chart1Canvas.getContext("2d");



    let scale = 1;
    let offsetX = 0;
    let offsetY = 0;
    let isDragging = false;

    let startX = 0;
    let startY = 0;

    function drawChart1() {
        chart1Ctx.clearRect(0, 0, chart1Canvas.width, chart1Canvas.height);

        const rowsTable1 = tbody1.querySelectorAll("tr");
        const data = [];

        for (const row of rowsTable1) {
            const x = parseFloat(row.querySelector("td:first-child").textContent);
            const y = parseFloat(row.querySelector("td:nth-child(2)").textContent);
            data.push({ x, y });
        }

        chart1Ctx.strokeStyle = "blue";
        chart1Ctx.lineWidth = 2;

        chart1Ctx.beginPath();

        for (const point of data) {
            const x = (point.x * 50 + offsetX) * scale;
            const y = (chart1Canvas.height - point.y * 50 + offsetY) * scale;
            chart1Ctx.lineTo(x, y);
        }

        chart1Ctx.stroke();
    }

    chart1Canvas.addEventListener("mousedown", function (event) {
        isDragging = true;
        startX = event.clientX;
        startY = event.clientY;
    });






    document.addEventListener("mousemove", function (event) {
        if (isDragging) {
            const deltaX = event.clientX - startX;
            const deltaY = event.clientY - startY;

            offsetX += deltaX;
            offsetY += deltaY;

            startX = event.clientX;
            startY = event.clientY;

            drawChart1();
        }
    });


    document.addEventListener("wheel", function (event) {
        if (event.deltaY < 0) {
            scale *= 1.1;
        } else {
            scale /= 1.1;
        }

        drawChart1();
    });

    document.addEventListener("mouseup", function () {
        isDragging = false;
    });


    document.addEventListener("keydown", function (event) {
        if (event.code === 'Escape') {
            scale = 1;
            offsetX = 0;
            offsetY = 0;
            drawChart1();
        }
    });



    drawChart1();

    const chart2Canvas = document.getElementById("chart2");
    const chart2Ctx = chart2Canvas.getContext("2d");

    let scale2 = 1;
    let offsetX2 = 0;
    let offsetY2 = 0;
    let isDragging2 = false;

    let startX2 = 0;
    let startY2 = 0;

    function drawChart2() {
        chart2Ctx.clearRect(0, 0, chart2Canvas.width, chart2Canvas.height);

        const rowsTable2 = tbody2.querySelectorAll("tr");
        const data2 = [];

        for (const row of rowsTable2) {
            const x = parseFloat(row.querySelector("td:first-child").textContent);
            const y = parseFloat(row.querySelector("td:nth-child(2)").textContent);
            data2.push({ x, y });
        }

        chart2Ctx.strokeStyle = "red";
        chart2Ctx.lineWidth = 2;

        chart2Ctx.beginPath();

        for (const point of data2) {
            const x = (point.x * 50 + offsetX2) * scale2;
            const y = (chart2Canvas.height - point.y * 50 + offsetY2) * scale2;
            chart2Ctx.lineTo(x, y);
        }

        chart2Ctx.stroke();
    }

    chart2Canvas.addEventListener("mousedown", function (event) {
        isDragging2 = true;
        startX2 = event.clientX;
        startY2 = event.clientY;
    });

    document.addEventListener("mousemove", function (event) {
        if (isDragging2) {
            const deltaX = event.clientX - startX2;
            const deltaY = event.clientY - startY2;

            offsetX2 += deltaX;
            offsetY2 += deltaY;

            startX2 = event.clientX;
            startY2 = event.clientY;

            drawChart2();
        }
    });

    document.addEventListener("wheel", function (event) {
        if (event.deltaY < 0) {
            scale *= 1.1;
        } else {
            scale /= 1.1;
        }

        drawChart2();
    });

    document.addEventListener("mouseup", function () {
        isDragging2 = false;
    });

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            scale2 = 1;
            offsetX2 = 0;
            offsetY2 = 0;

            drawChart2();
        }
    });

    drawChart2();

    const chart3Canvas = document.getElementById("chart3");
    const chart3Ctx = chart3Canvas.getContext("2d");

    let scale3 = 1;
    let offsetX3 = 0;
    let offsetY3 = 0;
    let isDragging3 = false;

    let startX3 = 0;
    let startY3 = 0;

    function drawChart3() {
        chart3Ctx.clearRect(0, 0, chart3Canvas.width, chart3Canvas.height);

        const rowsTable3 = tbody3.querySelectorAll("tr");
        const data3 = [];

        for (const row of rowsTable3) {
            const x = parseFloat(row.querySelector("td:first-child").textContent);
            const y = parseFloat(row.querySelector("td:nth-child(2)").textContent);
            data3.push({ x, y });
        }

        chart3Ctx.strokeStyle = "green";
        chart3Ctx.lineWidth = 2;

        chart3Ctx.beginPath();

        for (const point of data3) {
            const x = (point.x * 50 + offsetX3) * scale3;
            const y = (chart3Canvas.height - point.y * 50 + offsetY3) * scale3;
            chart3Ctx.lineTo(x, y);
        }

        chart3Ctx.stroke();
    }

    chart3Canvas.addEventListener("mousedown", function (event) {
        isDragging3 = true;
        startX3 = event.clientX;
        startY3 = event.clientY;
    });

    document.addEventListener("mousemove", function (event) {
        if (isDragging3) {
            const deltaX = event.clientX - startX3;
            const deltaY = event.clientY - startY3;

            offsetX3 += deltaX;
            offsetY3 += deltaY;

            startX3 = event.clientX;
            startY3 = event.clientY;

            drawChart3();
        }
    });

    document.addEventListener("wheel", function (event) {
        if (event.deltaY < 0) {
            scale *= 1.1;
        } else {
            scale /= 1.1;
        }

        drawChart3();
    });

    document.addEventListener("mouseup", function () {
        isDragging3 = false;
    });

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            scale3 = 1;
            offsetX3 = 0;
            offsetY3 = 0;

            drawChart3();
        }
    });

    drawChart3();




    calculateButton.addEventListener('click', function () {
        const message = "При нажатии ESC, графики возвращаются в дефолтное положение"
        setTimeout(function () {
            alert(message);
        }, 3000);

    });
});
