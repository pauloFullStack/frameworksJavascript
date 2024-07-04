export const response = (data) => {
    if (!data.status) {
        data.error.forEach((itemError) => {

            document.querySelector(
                `[name="${itemError.incorrectFieldName}"]`,
            ).style = "border: 1px solid red";

            document.querySelector(
                `[name="${itemError.incorrectFieldName}Notification"]`,
            ).innerHTML = itemError.message;
        });

        return data;

    } else {
        if (data.isClearFields) {
            const form = document.querySelector("form");
            Array.from(form.elements).forEach((elemento) => {
                if (elemento.tagName === "INPUT" && elemento.type !== "hidden") {
                    elemento.value = "";
                }
            });
        }

        return data;
    }
}


export const clearNotification = (event, color = "#adadad") => {
    event.target.style = `border: 1px solid ${color}`;
    event.target.nextElementSibling.innerHTML = "";
}
