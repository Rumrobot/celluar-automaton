(function(){
    const rowsnum = 30;    
    const colsnum = 30;
    const cellSize = 20;
    const initConfig = ["7:8", "9:8", "9:9", "8:9", "8:10"];

    var t = 0;

    function create() 
    {
        var container = getContainer();

        container.style.width = (colsnum * cellSize + colsnum) + "px";

        for (var i = 1; i <= rowsnum; i++) 
        {
            for (var j = 1; j <= colsnum; j++)
            {
                var cell = document.createElement("div");
                cell.id = i + ":" + j;
                cell.classList.add("cell");
                cell.style.width = cellSize + "px";
                cell.style.height = cellSize + "px";

                container.appendChild(cell);
            }
        }
    }

    function initializeGrid()
    {
        for (let i = 1; i <= rowsnum; i++)
        {
            for (let j = 1; j <= colsnum; j++)
            {
                if (initConfig.indexOf(i + ":" + j) >= 0)
                {
                    set(i, j, 1);
                } 
                else
                {
                    set(i, j, 0);    
                }
            }
        }
    }

    function updateCycleText()
    {
        var text = document.getElementById("cycleText");
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

                let north = get(i - 1, j);
                let south = get(i + 1, j);
                let east = get(i, j + 1);
                let west = get(i, j - 1);
                let northeast = get(i - 1, j + 1);
                let southeast = get(i + 1, j + 1);
                let northwest = get(i - 1, j - 1);
                let southwest = get(i + 1, j - 1);
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
    }

    function get(i, j)
    {
        let cell = getCell(i, j);
        let value = cell.getAttribute("data-value") || 0;
        return parseInt(value);
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
        if (state === 1 && neighSum < 2)
        {
            return 0;
        }
        if (state === 1 && neighSum >= 2 && neighSum <= 3)
        {
            return 1;
        }
        if (state === 1 && neighSum > 3)
        {
            return 0;
        }
        if (state === 0 && neighSum === 3)
        {
            return 1;
        }
        return state;
    }

    window.addEventListener("load", function()
    {
        create();
        initializeGrid();
        updateCycleText();
        forwardButton();
        backwardsButton();
    });
})();
