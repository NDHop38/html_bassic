window.onload = function () {
    const rentalForm = document.getElementById('rental-form');
    const totalPriceInput = document.getElementById('total-price');
    const carSelect = document.getElementById('Car');
    const startDateInput = document.getElementById('start-date');
    const endDateInput = document.getElementById('end-date');
    const submitButton = document.getElementById('submit-button');
    const destinationSelect = document.getElementById('destination');
    const otherDestinationInput = document.getElementById('otherDestinationInput');

    rentalForm.addEventListener('input', function (event) {
        const startDate = new Date(startDateInput.value);
        const endDate = new Date(endDateInput.value);
        const carType = carSelect.value;

        const totalPrice = calculateTotalPrice(startDate, endDate, carType);
        totalPriceInput.value = totalPrice.toLocaleString('vi-VN') + ' VND';
    });

    rentalForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const fullname = document.getElementById('fullname').value;
        const phone = document.getElementById('phone').value;
        const destination = destinationSelect.value === 'dia-diem-khac' ? otherDestinationInput.value : destinationSelect.value;
        const startDate = startDateInput.value;
        const endDate = endDateInput.value;
        const carType = carSelect.value;
        const totalPrice = calculateTotalPrice(new Date(startDate), new Date(endDate), carType);
        const confirmationMessage = `Họ và Tên: ${fullname}\nSố Điện Thoại: ${phone}\nNgày Đi: ${startDate}\nNgày Trả: ${endDate}\nLoại Xe: ${carType}\nGiá Tiền: ${totalPrice.toLocaleString('vi-VN')} VNĐ`; 
        alert(confirmationMessage);
        sendEmail(fullname, phone, destination, startDate, endDate, totalPrice);

        rentalForm.reset();
    });

    destinationSelect.addEventListener("change", function () {
        const selectedValue = destinationSelect.value;

        if (selectedValue === "dia-diem-khac") {
            otherDestinationInput.style.display = "block";
        } else {
            otherDestinationInput.style.display = "none";
        }

        // Update the displayed destination if the user selects "Other"
        if (selectedValue === "dia-diem-khac") {
            document.getElementById("destinationMessage").textContent = "Điểm Đến: " + otherDestinationInput.value;
        } else {
            // Ensure that the destination message is defined
            const selectedOption = destinationSelect.options[destinationSelect.selectedIndex];
            if (selectedOption) {
                document.getElementById("destinationMessage").textContent = "Điểm Đến: " + selectedOption.text;
            }
        }
    });

    submitButton.addEventListener('click', function (event) {
        event.preventDefault();

        const startDate = startDateInput.value;
        const endDate = endDateInput.value;
        const carType = carSelect.value;
        const totalPrice = totalPriceInput.value;
    });

    function calculateTotalPrice(startDate, endDate, carType) {
        const oneDay = 24 * 60 * 60 * 1000;
        const days = Math.round(Math.abs((endDate - startDate) / oneDay)) + 1;

        let pricePerDay;
        switch (carType) {
            case 'Xe 4 chỗ':
                pricePerDay = 800000;
                break;
            case 'Xe 7 chỗ':
                pricePerDay = 1500000;
                break;
            case 'Xe 16 chỗ':
                pricePerDay = 1000000;
                break;
            case 'Xe 29 chỗ':
                pricePerDay = 2000000;
                break;
            case 'Xe 35 chỗ ':
                pricePerDay = 2500000;
                break;
            case 'Xe 45 chỗ':
                pricePerDay = 3000000;
                break;
            default:
                pricePerDay = 0;
                break;
        }

        return days * pricePerDay;
    }
};
