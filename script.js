// Save Donor to Local Storage
const saveDonor = (donor) => {
    let donors = JSON.parse(localStorage.getItem('donors')) || [];
    donors.push(donor);
    localStorage.setItem('donors', JSON.stringify(donors));
};

// Retrieve Donors from Local Storage
const getDonors = () => {
    return JSON.parse(localStorage.getItem('donors')) || [];
};

// Handle Donor Registration
document.getElementById('donorForm')?.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const bloodType = document.getElementById('bloodType').value;
    const donationDate = document.getElementById('donationDate').value;

    const donor = { name, bloodType, donationDate };
    saveDonor(donor);

    alert('Donor registered successfully!');
    this.reset();
});

// Display Blood Inventory
const inventoryList = document.getElementById('inventoryList');
if (inventoryList) {
    const donors = getDonors();
    donors.forEach(donor => {
        const listItem = document.createElement('li');
        listItem.textContent = `${donor.name} - Blood Type: ${donor.bloodType} (Last Donation: ${donor.donationDate})`;
        inventoryList.appendChild(listItem);
    });
}

// Search Blood by Type
document.getElementById('searchBtn')?.addEventListener('click', function () {
    const searchType = document.getElementById('searchBloodType').value;
    const donors = getDonors();
    const results = donors.filter(donor => donor.bloodType === searchType);

    const searchResults = document.getElementById('searchResults');
    searchResults.innerHTML = '';

    if (results.length > 0) {
        results.forEach(result => {
            const listItem = document.createElement('li');
            listItem.textContent = `${result.name} (Last Donation: ${result.donationDate})`;
            searchResults.appendChild(listItem);
        });
    } else {
        searchResults.textContent = 'No donors found for the selected blood type.';
    }
});
