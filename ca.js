(function(){
    const rowsnum = 9;    
    const colsnum = 9;
    const cellSize = 20;
    const initConfig = ["2:2", "4:7", "7:4", "5:5", "3:8", "8:7", "8:8"];

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

    window.addEventListener("load", function()
    {
        create();
        initializeGrid();
    });
})();
