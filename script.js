// عند تحميل الصفحة، استرجع الألوان المحفوظة من localStorage
document.addEventListener('DOMContentLoaded', function() {
    reloadColors(); // استرجاع الألوان المخزنة عند تحميل الصفحة
});

// إضافة أنماط CSS للـ tooltip المخصص
const style = document.createElement('style');
style.textContent = `
  #custom-tooltip {
    position: absolute;
    background: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 5px 10px;
    border-radius: 4px;
    font-size: 14px;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.3s;
    z-index: 1000;
  }
`;
document.head.appendChild(style);

// إنشاء عنصر الـ tooltip المخصص
const customTooltip = document.createElement('div');
customTooltip.id = 'custom-tooltip';
document.body.appendChild(customTooltip);

// إضافة مستمعين للأحداث لتغيير اللون عند النقر وإظهار الـ tooltip عند المرور بالماوس
var world = document.getElementsByTagName("path");
for (var i = 0; i < world.length; i++) {
    var country = world[i];
    country.setAttribute("data-toggle", "tooltip");
    country.setAttribute("data-placement", "top");
    country.setAttribute("title", country.getAttribute("id"));
    
    // إضافة مستمع للنقر لتغيير اللون وحفظه في localStorage
    country.addEventListener('click', function(e) {
        const randomColor = getRandomColor();
        e.target.style.fill = randomColor;
        console.log(`تم تغيير لون ${e.target.id} إلى ${randomColor}`);

        // حفظ اللون الجديد في localStorage
        localStorage.setItem(e.target.getAttribute("id"), randomColor);
    });

    // إضافة مستمعين لإظهار وإخفاء الـ tooltip المخصص
    country.addEventListener('mousemove', showCustomTooltip);
    country.addEventListener('mouseout', hideCustomTooltip);
}

// مستمع لزر "Reset Colors" لإعادة تعيين الألوان
document.getElementById('reset-colors').addEventListener('click', function() {
    for (var i = 0; i < world.length; i++) {
        var country = world[i];
        
        // إعادة تعيين اللون الافتراضي
        country.style.fill = '#b9b9b9'; // إعادة اللون الرمادي
        
        // حذف اللون من localStorage
        localStorage.removeItem(country.getAttribute("id"));
    }
    
    console.log('تمت إعادة تعيين الألوان وحذف البيانات المخزنة');
});

// مستمع لزر "Reload Colors" لاسترجاع الألوان المخزنة
document.getElementById('reloadButton').addEventListener('click', function() {
    resetColors(); // استدعاء دالة إعادة تعيين الألوان
    console.log('تمت إعادة تعيين الألوان إلى الرمادي');
});

// دالة لإعادة تعيين الألوان إلى الرمادي
function resetColors() {
    for (var i = 0; i < world.length; i++) {
        var country = world[i];
        country.style.fill = '#b9b9b9'; // إعادة تعيين اللون إلى الرمادي
        
        // حذف اللون من localStorage
        localStorage.removeItem(country.getAttribute("id"));
    }
}

// دالة لاسترجاع الألوان المخزنة من localStorage
function reloadColors() {
    for (var i = 0; i < world.length; i++) {
        var country = world[i];
        var savedColor = localStorage.getItem(country.getAttribute("id"));
        if (savedColor) {
            country.style.fill = savedColor; // استرجاع اللون المحفوظ
        }
    }
}

function showCustomTooltip(e) {
    const country = e.target;
    customTooltip.textContent = country.getAttribute("id");
    customTooltip.style.opacity = '1';
    customTooltip.style.left = e.pageX + 'px';
    customTooltip.style.top = (e.pageY - 30) + 'px';  // 30px فوق المؤشر
}

function hideCustomTooltip() {
    customTooltip.style.opacity = '0';
}

$(function () {
    // تهيئة التولتيب الأصلي (يمكن إزالته إذا لم تعد بحاجة إليه)
    $('[data-toggle="tooltip"]').tooltip();
});

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color;
    do {
        color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
    } while (color === '#B9B9B9' || color === '#666666'); // تجنب الألوان الرمادية
    return color;
}
