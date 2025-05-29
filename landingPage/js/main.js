const menuMob = document.getElementById("menu-mobile").children[0];
const btnAnimar = document.getElementById("btn_menu");

let menuMobAnimation = null;
function clickAnimation() {
  btnAnimar.classList.toggle("ativo");
  if (menuMobAnimation) clearTimeout(menuMob);
  if (btnAnimar.classList.contains("ativo")) {
    menuMob.style.display = "block";
    menuMobAnimation = setTimeout(() => { // espera a animação do menu fechando
      menuMob.classList.add("abrir");
    }, 1);
  } else {
    menuMob.classList.remove("abrir");
    menuMobAnimation = setTimeout(() => { // espera a animação do menu fechando
      menuMob.style.display = "none";
    }, 500);
  }
}

menuMob.addEventListener("click", clickAnimation);