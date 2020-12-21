(function(){
    const rowsnum = 30;    
    const colsnum = 30;
    const cellSize = 20;

    let timer;
    let speed = 500;

    let t = 0;
    let p = 75; //The percentage probalbility of getting infected (0.5682)
    let chart;

    function create() 
    {
        let container = getContainer();

        container.style.width = (colsnum * cellSize + colsnum) + "px";

        for (let i = 1; i <= rowsnum; i++) 
        {
            for (let j = 1; j <= colsnum; j++)
            {
                let cell = document.createElement("div");
                cell.id = i + ":" + j;
                cell.classList.add("cell");
                //cell.
                cell.style.width = cellSize + "px";
                cell.style.height = cellSize + "px";

                container.appendChild(cell);
            }
        }
    }

    function updateCycleText()
    {
        let text = document.getElementById("cycleText");
        text.textContent = "cycle " + t;
    }

    function set(i, j, value)
    {
        let cell = getCell(i, j);
        cell.setAttribute("data-value", value);
    }

    function getCell(i, j)
    {
        return document.getElementById(i + ":" + j);
    }

    function getContainer()
    {
        return document.getElementById("ca");
    }

    function forwardButton()
    {
        let holder = document.getElementById("forward-button");
        holder.addEventListener("click", function(){
            next();
            updateCycleText();
        });
    }

    function backwardsButton()
    {
        let holder = document.getElementById("backwards-button");
        holder.addEventListener("click", function(){
            if (t > 0)
            {
                t--;
                updateCycleText();
            }
        });
    }

    function next()
    {
        //part 1 - Computing
        for (let i = 2; i <= rowsnum - 1; i++)
        {
            for (let j = 2; j <= colsnum - 1; j++)
            {
                let cell = get(i, j);

                let north = isInfected(i - 1, j);
                let south = isInfected(i + 1, j);
                let east = isInfected(i, j + 1);
                let west = isInfected(i, j - 1);
                let northeast = isInfected(i - 1, j + 1);
                let southeast = isInfected(i + 1, j + 1);
                let northwest = isInfected(i - 1, j - 1);
                let southwest = isInfected(i + 1, j - 1);
                let neighSum = north + south + east + west + northeast + southeast + northwest + southwest;

                setTmp(i, j, calculateState(cell, neighSum));   
            }
        }

        //part 2 - Applying
        for (let i = 2; i <= rowsnum - 1; i++)
        {
            for (let j = 2; j <= colsnum - 1; j++)
            {
                set(i, j, getTmp(i, j));
                removeTmpValue(i, j);
            }
        }

        //part 3 - Updating variable
        t++;

        updateActiveCells();
    }

    /**
     * The GET function is returning the current state of the cell.
     * @param {*} i The row.
     * @param {*} j The column.
     * @returns 0 or 1.
     */
    function get(i, j)
    {
        let cell = getCell(i, j);
        let value = cell.getAttribute("data-value") || -1;
        return parseInt(value);
    }
  
    function isInfected(i, j)
    {
        let dataValue = get(i, j);

        if (dataValue >= 1)
        {
            return 1;
        } else{
            return 0;
        }
    }

    function setTmp(i, j, value)
    {
        let cell = getCell(i, j);
        cell.setAttribute("data-tmpvalue", value);
    }

    function removeTmpValue (i, j) {
        let cell = getCell(i, j);
        cell.removeAttribute("data-tmpvalue");
    }

    function getTmp(i, j)
    {
        let cell = getCell(i, j);
        return parseInt(cell.getAttribute("data-tmpvalue"));
    }

    function calculateState(state, neighSum)
    {
        if (state >= 1)
        {
            console.log("State transision: ", state, "-->", state-1);
            return state-1;
        }else if (state === 0){
            console.log("State transision: ", state, "-->", 0);
            return 0;
        }else {
            //This is where we calculate the probability of getting infected from the neighbors.

            for (let x=0; x<neighSum; x++)
            {
                let randomNumber = 100*Math.random();

                if (randomNumber > p)
                {
                   //We continue to the next one
                } else {
                    console.log("State transision: ", state, "-->", 11);
                    return 11;
                }
            }
            console.log("State transision: ", state, "-->", -1);
            return -1;                                    
          
        }
   
    }

    function initializeCells()
    {
        for (let i = 1; i <= rowsnum; i++) 
        {
            for (let j = 1; j <= colsnum; j++)
            {
                let cell = getCell(i, j);
                cell.addEventListener("click", function(){
                    if (get(i, j) === 1)
                    {
                        set(i, j, -1);
                        updateActiveCells();
                        
                    } else {
                        set(i, j, 11);
                        updateActiveCells();
                    }
                });
            }
        }
    }

    function initializePlayControls()
    {
        let playButton = document.getElementById("play-button");
        playButton.addEventListener("click", function(){
            if (timer > 0)
            {
                return;
            }

            timer = window.setInterval(function(){
                next();
                updateCycleText();
            }, speed);

            let statictop = document.getElementById("static-top");
            statictop.className = "show-pause";
        });
        
        let pauseButton = document.getElementById("pause-button");
        pauseButton.addEventListener("click", function(){
            window.clearInterval(timer);
            timer = 0;

            let statictop = document.getElementById("static-top");
            statictop.className = "show-play"
        });
    }

    function updateActiveCells()
    {
        let activeCells = 0;

        for (let i = 1; i <= rowsnum; i++) 
        {
            for (let j = 1; j <= colsnum; j++)
            {
                if (isInfected(i, j) === 1)
                {
                    activeCells++;
                }
            }
        } 

        let text = document.getElementById("active-cells");
        text.textContent = "Active Cells: " + activeCells;

        addDataToChart(activeCells, t);
    }

    function displayChart() 
    {
        var ctx = document.getElementById("chart");

        chart = new Chart(ctx, {
            type: "line",
            data: {
                labels: ["Active Cells History"],
                datasets: [{
                    label: "is how many times the chart has been updated",
                    data: [],
                    backgroundColor: [
                        "rgba(225,0,0, 0.2)"
                    ] 
                 }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
    }

    function addDataToChart(value, label)
    {
        chart.data.labels.push(label);
        chart.data.datasets[0].data.push(value);
        chart.update();
    }

    window.addEventListener("load", function()
    {
        displayChart();
        create();
        initializeCells();
        updateCycleText();
        forwardButton();
        backwardsButton();
        initializePlayControls();
        updateActiveCells();
        
    });
})();
