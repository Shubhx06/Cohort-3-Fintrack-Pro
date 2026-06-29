const addTransactionBtn = document.querySelector(".addTransactionBtn")
const overlay = document.querySelector(".overlay")
const closebtn = document.querySelector(".close-btn")

addTransactionBtn.addEventListener("click",()=>{
headingOfTansaDiv.textContent="Add Transaction"
overlay.style.display ="flex"

})

closebtn.addEventListener("click",()=>{
    overlay.style.display ="none"
})



const recordsTableBody = document.querySelector(".recordsTableBody")
const savebtn = document.querySelector(".save-btn")
const type = document.querySelector("#type")
const descriptions = document.querySelector("#description")
const amounts = document.querySelector("#amount")
const dates = document.querySelector("#date")
const categorys = document.querySelector("#category")
const headingOfTansaDiv = document.querySelector(".headingOfTansaDiv")

let arryOfDetails = JSON.parse(localStorage.getItem("data")) ||[]
let editIndex = -1;

function render(){
    recordsTableBody.innerHTML=""
    totalTrans.textContent = arryOfDetails.length
    calCurrentTotalBal()
arryOfDetails.forEach((value,index)=>{

      recordsTableBody.innerHTML +=`    
                    <div class="recordRow">
                        <span class="recordDate">${value.date}</span>
                        <span class="recordDesc">${value.description}</span>
                        <span class="recordCategory"><span class="categoryBadge">${value.category}</span></span>
                       <span class="recordAmount ${value.typeOftrans === "Income" ? "amountGreen" : "amountRed"}">${value.typeOftrans === "Income" ? "+" : "-"}$${value.amount}</span>
                        <span class="recordActions">
                            <button  onclick="editRecord(${index})" class="editBtn"><i class="fa-solid fa-pen"></i></button>
                            <button onclick="deleteRecord(${index})" class="deleteBtn"><i class="fa-solid fa-trash"></i></button>
                        </span>
                    </div>`
        
})



}



savebtn.addEventListener('click',()=>{
    let typeOftrans = type.value;
    let description = descriptions.value;
    let  amount =  amounts.value;
    let  date =  dates.value;
    let  category =  categorys.value;

    let obj ={
     typeOftrans  ,
     description,
     amount,
     date,
     category

    }
 if (editIndex === -1) {
    arryOfDetails.push(obj);
 } else {
    arryOfDetails[editIndex] = obj;
    editIndex = -1;
 }

 localStorage.setItem("data", JSON.stringify(arryOfDetails));
 overlay.style.display ="none"     
 render();
    
})




let deleteRecord=(index)=>{

arryOfDetails.splice(index,1)
localStorage.setItem("data",JSON.stringify(arryOfDetails))
 render()
}

let editRecord =(index)=>{

editIndex = index;

 let record = arryOfDetails[index];
  console.log(record);
  
    type.value = record.typeOftrans;
    descriptions.value = record.description;
    amounts.value = record.amount;
    dates.value = record.date;
    categorys.value = record.category;
    overlay.style.display ="flex"    
    headingOfTansaDiv.textContent="Edit Transaction"
}





const totalTrans = document.querySelector("#totalTrans")
const totalExp = document.querySelector("#totalExp")
const totalInc = document.querySelector("#totalInc")
const currentBal = document.querySelector("#currentBal")




function calCurrentTotalBal(){
    
let totalIncome = 0;
let totalExpense = 0;

arryOfDetails.forEach(item => {
    if (item.typeOftrans === "Income") {
        totalIncome += Number(item.amount);
    } else {
        totalExpense += Number(item.amount);
    }
});

let currentBalance = totalIncome - totalExpense;

totalExp.textContent = totalExpense
totalInc.textContent = totalIncome
currentBal.textContent = currentBalance
renderChart()
}




let cashFlowChart;

function renderChart() {
    const incomeByDate = {};
    const expenseByDate = {};

    arryOfDetails.forEach(item => {
        const amt = Number(item.amount);
        if (item.typeOftrans === "Income") {
            incomeByDate[item.date] = (incomeByDate[item.date] || 0) + amt;
        } else {
            expenseByDate[item.date] = (expenseByDate[item.date] || 0) + amt;
        }
    });

    const labels = [...new Set([...Object.keys(incomeByDate), ...Object.keys(expenseByDate)])].sort();
    const incomeData = labels.map(date => incomeByDate[date] || 0);
    const expenseData = labels.map(date => expenseByDate[date] || 0);

    if (cashFlowChart) {
        cashFlowChart.data.labels = labels;
        cashFlowChart.data.datasets[0].data = incomeData;
        cashFlowChart.data.datasets[1].data = expenseData;
        cashFlowChart.update();
        return;
    }

    const ctx = document.getElementById("cashFlowChart");

    cashFlowChart = new Chart(ctx, {
        type: "bar",
        data: {
            labels: labels,
            datasets: [
                {
                    label: "Income",
                    data: incomeData,
                    backgroundColor: "#166534",
                    borderRadius: 4
                },
                {
                    label: "Expenses",
                    data: expenseData,
                    backgroundColor: "#991b1b",
                    borderRadius: 4
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }
            },
            scales: {
                y: { beginAtZero: true }
            }
        }
    });
}




const resetBtn = document.querySelector(".resetBtn")
resetBtn.addEventListener("click", () => {
    localStorage.removeItem("data");
    arryOfDetails = [];
    render();
});




const darkModeToggle = document.querySelector("#darkModeToggle");

// restore saved preference on page load
if (localStorage.getItem("darkMode") === "on") {
    document.body.classList.add("dark-mode");
    darkModeToggle.checked = true;
}

darkModeToggle.addEventListener("change", () => {
    if (darkModeToggle.checked) {
        document.body.classList.add("dark-mode");
        localStorage.setItem("darkMode", "on");
    } else {
        document.body.classList.remove("dark-mode");
        localStorage.setItem("darkMode", "off");
    }
});



renderChart()
 render()