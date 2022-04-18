function menuItemEnter() {
  const submenu = document.getElementsByClassName('menu__sub')[0];
  submenu.style.display = 'block';
}

function menuItemLeave() {
  const submenu = document.getElementsByClassName('menu__sub')[0];
  submenu.style.display = 'none';
}

const menuItems = document.getElementsByClassName('menu__main__item');
for (const menuItem of menuItems) {
  menuItem.onmouseenter = menuItemEnter;
  menuItem.onmouseleave = menuItemLeave;
}
