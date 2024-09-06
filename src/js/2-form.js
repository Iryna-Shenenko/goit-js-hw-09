import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

let formData = {
    email: '',
    message: '',
};

const form = document.querySelector('.feedback-form');

try {
    const savedData = localStorage.getItem('feedback-form-state');
    if (savedData) {
        formData = JSON.parse(savedData);
        form.email.value = formData.email  || '';
        form.message.value = formData.message  || '';
    }
} catch (error) {
     console.log('Error parsing saved data from localStorage:', error);
}

form.addEventListener('input', onInput);

function onInput(event) {
    try {
        const trimmedValue = event.target.value.trim();
        formData[event.target.name] = trimmedValue;

        // Сохраняем обновленные данные в локальном хранилище
        localStorage.setItem('feedback-form-state', JSON.stringify(formData));
    } catch (error) {
        console.error('Error saving data to localStorage:', error);
    }
}

form.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
    event.preventDefault();
    const { email, message } = formData;

    if (!email || !message) {
        alert('Please fill in all fields');
        return;
    }
    else {
        console.log(formData);
    }

    try {
        form.reset();
        formData = {
            email: '',
            message: '',
        };
        localStorage.removeItem('feedback-form-state');
    } catch (error) {
        console.error('Error saving data to localStorage:', error); 
    }

}