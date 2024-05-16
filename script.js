function gerar()
{
    var vertices = parseInt(document.getElementById("vertices").value);
    var tabela = document.getElementById("tabela");
        tabela.innerHTML = "";
    
    if(Number.isNaN(vertices) || vertices < 0)
    {
        alert("Preencha todos os campos corretamente!");
    }
    else
    {
        for(var i = 0; i < vertices+1; i++)
        {
            var linha = document.createElement("tr");

            for(var j = 0; j < vertices+1; j++)
            {
                var coluna = document.createElement("td");
                var input;
                if(i == 0 && j == 0)
                {
                    input = document.createTextNode("NÓS");
                    coluna.setAttribute("style", "font-weight: 700;");
                }
                else
                {
                    if(i == 0)
                    {
                        input = document.createTextNode(j);
                        coluna.setAttribute("style", "font-weight: 700;");
                        if(j == 1)
                        {
                            coluna.setAttribute("style", "background-color:green; color: white; font-weight: 700;");
                        }
                    }
                    else
                    {
                        if(j == 0)
                        {
                            input = document.createTextNode(i);
                            coluna.setAttribute("style", "font-weight: 700;");
                            if(i == 1)
                            {
                                coluna.setAttribute("style", "background-color:green; color: white; font-weight: 700;");
                            }
                        }
                        else
                        {
                            input = document.createElement("input");
                            input.setAttribute("type", "number")
                            input.setAttribute("id", "custo"+i+""+j)
                            input.setAttribute("placeholder", i+"↦"+j)
                        }
                    }
                }
                    
                coluna.appendChild(input);
                linha.appendChild(coluna);
            }

            tabela.appendChild(linha);
        }
        document.getElementById("resultado").hidden = false;          
    }
}

function calcular()
{
    var QTDvertices = parseInt(document.getElementById("vertices").value);
    var nos = [], nos_custos = [];

    for(var i = 1; i <= QTDvertices; i++)
    {   
        
        var custos = []
        for(var j = 1; j <= QTDvertices; j++)
        {
            var custo = parseInt(document.getElementById("custo"+i+""+j).value);
            if(Number.isNaN(custo) || custo < 0)
            {
                alert("Preencha todos os campos!");
                i = j = QTDvertices + 1;
                break
            }
            else
            {
                custos[j] = custo;
            }
        }

        nos_custos[i] = Infinity;
        nos[i] = custos;

    }

    var origem = [];

    for(var i = 1; i <= QTDvertices; i++)
    {   
        nos_custos[1] = 0
        for(var j = 1; j <= QTDvertices; j++)
        {
            if((nos_custos[i] + nos[i][j]) < nos_custos[j] && nos[i][j] > 0)
            {
                nos_custos[j] = nos_custos[i] + nos[i][j];
                origem[j] = i 
            }
        }
    }

    var resultado = document.getElementById("resultado")

    resultado.innerHTML = `
        <tr>
            <td colspan="3">
                <input type="button" onclick="calcular()" id="calcular" value="CALCULAR">
            </td>
        </tr>
        <tr id="tr_resultado1">
            <td colspan="3">
                caminho mais curto
            </td>
        </tr>
        <tr id="tr_resultado2">
            <td>
                nó anterior
            </td>
            <td>
               destino
            </td>
            <td>
               custo
            </td>
        </tr>
    `;

    for(var i = 1; i <= origem.length-2; i++)
    {
        if(origem[i] != "")
        {
            var linha = document.createElement("tr");
            for(var j = 1; j <= 3; j++)
            {
                var coluna = document.createElement("td");
                var input;
                if(j == 1)
                {   
                    input = document.createTextNode(parseInt(origem[i+1]))
                }
                else
                {
                    if(j == 2)
                    {
                        input = document.createTextNode(i+1)
                    }
                    else
                    {
                        input = document.createTextNode(nos_custos[i+1])
                    }
                }
                coluna.appendChild(input)
                if(i % 2 == 0)
                {
                    linha.setAttribute("style", "background-color:rgb(209, 209, 209);")
                }
                linha.setAttribute("id", "resultados")
                linha.appendChild(coluna)
            }
            resultado.appendChild(linha);
        }
    }
}