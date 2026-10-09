const header = document.querySelector('.site-header');
const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('.global-nav');


// ダイトクのサイトアイコンを全ページで統一する。
const faviconSvg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><rect width="512" height="512" rx="104" fill="#071B35"/><path d="M108 112h155c84 0 142 56 142 144s-58 144-142 144H108V112Zm78 70v148h70c43 0 71-27 71-74s-28-74-71-74h-70Z" fill="#FFF" fill-rule="evenodd"/><path d="M91 329 202 218h91L182 329H91Z" fill="#D9AF58"/><path d="M292 218h129l-36 38H254l38-38Z" fill="#D9AF58"/></svg>';
const favicon = document.querySelector('link[rel~="icon"]') || document.createElement('link');
favicon.rel = 'icon';
favicon.type = 'image/svg+xml';
favicon.href = `data:image/svg+xml,${encodeURIComponent(faviconSvg)}`;
document.head.appendChild(favicon);


// 「実績紹介」から用途変更したサービスページの表記を全ページで統一する。
document.querySelectorAll('a[href="works.html"]').forEach((link) => {
  if (link.textContent.trim() === '実績紹介') link.textContent = 'サービス紹介';
});


const closeMenu = () => {
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'メニューを開く');
  nav.classList.remove('open');
  document.body.style.overflow = '';
};


menuButton?.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'メニューを開く' : 'メニューを閉じる');
  nav.classList.toggle('open', !isOpen);
  document.body.style.overflow = isOpen ? '' : 'hidden';
});


nav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));


window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 24);
}, { passive: true });


window.addEventListener('resize', () => {
  if (window.innerWidth > 980) closeMenu();
});


const inquirySelect = document.querySelector('#inquiry-type');
const params = new URLSearchParams(window.location.search);
if (inquirySelect && params.get('type') === 'recruit') {
  inquirySelect.value = '採用について';
}


const contactForm = document.querySelector('#contact-form');
contactForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(contactForm);
  const subject = `【ダイトクWebサイト】${data.get('お問い合わせ種別')}`;
  const body = [
    `お問い合わせ種別：${data.get('お問い合わせ種別')}`,
    `会社名：${data.get('会社名') || '未入力'}`,
    `お名前：${data.get('お名前')}`,
    `メールアドレス：${data.get('メールアドレス')}`,
    `電話番号：${data.get('電話番号') || '未入力'}`,
    '',
    'お問い合わせ内容：',
    data.get('お問い合わせ内容')
  ].join('\n');
  window.location.href = `mailto:info@daitoku-inc.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});
