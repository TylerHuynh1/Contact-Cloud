document.addEventListener("DOMContentLoaded", function () {
  // Function to add a new contact
  window.addContact = function () {
    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();

    if (!firstName || !lastName || !email || !phone) {
      alert("Please fill in all fields.");
      return;
    }

    const table = document
      .getElementById("contactsTable")
      .getElementsByTagName("tbody")[0];
    const newRow = table.insertRow();

    newRow.innerHTML = `
          <td class="border p-2">${firstName}</td>
          <td class="border p-2">${lastName}</td>
          <td class="border p-2">${email}</td>
          <td class="border p-2">${phone}</td>
          <td class="border p-2">
              <button onclick="editContact(this)" class="bg-blue-500 text-white px-2 py-1 rounded">✎</button>
              <button onclick="deleteContact(this)" class="bg-red-500 text-white px-2 py-1 rounded">🗑</button>
          </td>
      `;

    // Clear input fields
    document.getElementById("firstName").value = "";
    document.getElementById("lastName").value = "";
    document.getElementById("email").value = "";
    document.getElementById("phone").value = "";
  };

  // Function to delete a contact
  window.deleteContact = function (button) {
    button.closest("tr").remove();
  };

  // Function to edit a contact
  window.editContact = function (button) {
    const row = button.closest("tr");
    const cells = row.getElementsByTagName("td");

    document.getElementById("firstName").value = cells[0].innerText;
    document.getElementById("lastName").value = cells[1].innerText;
    document.getElementById("email").value = cells[2].innerText;
    document.getElementById("phone").value = cells[3].innerText;

    row.remove();
  };
});
