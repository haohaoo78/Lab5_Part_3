// public/js/form.js

document.addEventListener("DOMContentLoaded", () => {
  const forms = document.querySelectorAll("form");

  forms.forEach((form) => {
    form.addEventListener("submit", async (e) => {
      e.preventDefault(); // ngăn reload

      const action = form.getAttribute("action");
      const method = form.getAttribute("method") || "POST";
      const formData = new FormData(form);

      // chuyển formData thành object
      const data = {};
      formData.forEach((value, key) => {
        data[key] = value;
      });

      try {
        const response = await fetch(action, {
          method: method.toUpperCase(),
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });

        if (response.ok) {
          alert("Thao tác thành công!");
          // reload lại trang hoặc redirect
          window.location.reload();
        } else {
          const err = await response.text();
          alert("Lỗi: " + err);
        }
      } catch (err) {
        console.error(err);
        alert("Đã có lỗi xảy ra!");
      }
    });
  });
});
