const loadPhone = async (phone_name, isShowAll) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${phone_name}`
  );
  const { data: phones } = await res.json();
  displayPhones(phones, isShowAll);
};

const showAll = document.getElementById("show-all");
const displayPhones = (phones = [], isShowAll) => {
  const phoneContainer = document.getElementById("phone-container");
  phoneContainer.innerHTML = "";
  if (!isShowAll) {
    if (phones.length > 6) {
      showAll.classList.remove("hidden");
    } else {
      showAll.classList.add("hidden");
    }
    phones = phones.slice(0, 6);
  } else {
    showAll.innerText = "Show few";
    showAll.onclick = () => handleSearch();
  }
  phones.forEach((phone) => {
    const { image, phone_name: phoneName, slug: phoneId } = phone;

    const phoneCard = document.createElement("div");
    phoneCard.classList = "card bg-gray-100 shadow-md";
    phoneCard.innerHTML = `
      <figure>
        <img src="${image}" alt="Shoes" class="mt-8 rounded-xl"/>
      </figure>
      <div class="card-body">
        <h2 class="card-title">${phoneName}</h2>
        <p>If a dog chews shoes whose shoes does he choose?</p>
        <div class="card-actions justify-center">
          <button class="btn btn-primary" onclick="handleShowDetail('${phoneId}')">Show Detail</button>
        </div>
      </div>`;
    phoneContainer.appendChild(phoneCard);
  });
  toggleLoadingSpinner(false);
};

const handleShowDetail = async (phoneId) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phone/${phoneId}`
  );
  const { data: phone } = await res.json();
  showPhoneDetails(phone);
};

const showPhoneDetails = (phone) => {
  const {
    name: phoneName,
    image: phoneImage,
    mainFeatures: { storage },
    others: { GPS = null },
  } = phone;
  console.log(phone);
  const showDetailPhoneName = document.getElementById("show-detail-phone-name");
  showDetailPhoneName.innerText = phoneName;
  const showDetailContainer = document.getElementById("show-detail-container");
  showDetailContainer.innerHTML = `
    <img src="${phoneImage}" />
    <p><span>Storage: </span> ${storage}</p>
    <p><span>GPS: </span> ${GPS}</p>
  `;
  const detailModal = document.getElementById("detail-modal");
  detailModal.showModal();
};

const handleSearch = (isShowAll = false) => {
  if (!isShowAll) {
    showAll.innerText = "Show All";
    showAll.onclick = () => handleShowAllSearch();
  }
  toggleLoadingSpinner();
  const searchField = document.getElementById("search-field");
  const { value: searchText } = searchField;
  loadPhone(searchText, isShowAll);
};

const handleShowAllSearch = () => {
  handleSearch(true);
};

const toggleLoadingSpinner = (isLoading = true) => {
  const loadingSpinner = document.getElementById("loading-spinner");
  if (isLoading) {
    loadingSpinner.classList.remove("hidden");
  } else {
    loadingSpinner.classList.add("hidden");
  }
};

loadPhone();
