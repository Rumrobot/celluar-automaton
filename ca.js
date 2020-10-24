(function(){
    const rowsnum = 9;    
    const colsnum = 9;
    const cellSize = 20;

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

    function getContainer()
    {
        return document.getElementById("ca");
    }

    window.addEventListener("load", function()
    {
        create();
    });
})();
