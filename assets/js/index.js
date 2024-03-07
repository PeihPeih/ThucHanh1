document.getElementById("myForm").addEventListener("submit", function(event) {
    event.preventDefault(); 
    var name = document.getElementById("name").value;
    var dob = document.getElementById("dob").value;
    var idnum = document.getElementById("idNumber").value;
    var address = document.getElementById("address").value;
    
    // Tạo một đối tượng JSON từ dữ liệu
    var formData = {
        name: name,
        dob: dob,
        idnum: idnum,
        address: address
    };
    
    var jsonData = JSON.stringify(formData);
    
    var blob = new Blob([jsonData], { type: "application/json" });
    
    var url = URL.createObjectURL(blob);
    
    var a = document.createElement("a");
    a.href = url;
    a.download = "info.json"; 
    a.click();
});
