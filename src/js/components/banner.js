
import sliderInfo from '../../slider.json'
import SlickInit from '../../vendor/slick-custom.js';
import PopUpContent from './popUpContent';

SlickInit();

export default class Banner {

  addSection() {
    //just adds in section on the buy pages for the s22

    const url = window.location.pathname

    const div = 'div';
    const accodionSection = document.querySelector('#downBoxHtml > div:nth-child(1)');
    const showroomContainer = document.querySelector('.m_feature_jump');
    const tipsAndTricks = document.createElement(div);
    tipsAndTricks.classList.add('tipsAndTricks')

    const section = document.createElement('section');
    section.classList.add('hubble-pd-expand', 'hubble-see-actual-size');

    const anchorEle = document.createElement('a');
    anchorEle.setAttribute('href', 'javascript:;');
    anchorEle.setAttribute('role', 'button');
    anchorEle.classList.add('hubble-pd-expand__opener', 's-expand__opener');

    const headingTwo = document.createElement('h2');
    headingTwo.classList.add('hubble-pd-expand__opener-name');
    headingTwo.innerText = 'Tutorials, tips & tricks';

    const spanIcon = document.createElement('span');
    spanIcon.classList.add('hubble-pd-expand__opener-icon');

    anchorEle.append(headingTwo, spanIcon);

    const contentDiv = document.createElement(div);
    contentDiv.classList.add('hubble-pd-expand__content', 's-expand__content', 'samsung-upgrade__content__section');

    section.append(anchorEle, contentDiv);

    tipsAndTricks.append(section);


    if (url.includes('/uk/smartphones/galaxy-s22/showroom/') || url.includes('/uk/smartphones/galaxy-s22-ultra/showroom/')) {
    showroomContainer.insertAdjacentElement('afterend', tipsAndTricks);
    anchorEle.style.display = 'none';
    } else {
     console.log(accodionSection)
    accodionSection.insertAdjacentElement('afterend', tipsAndTricks);
    }

    //JS to open and close accordion

    const sectionClasses = section.classList;

    tipsAndTricks.querySelector('.hubble-pd-expand__opener').onclick = (e) => {
      sectionClasses.toggle('is-opened');
      sectionClasses.toggle('is-opened-active');

      document.querySelector('.slick-prev').click(); //so the slider slides to the left and loads
    }

  }

  createSlider() {
    const div = document.createElement('div');
    div.classList.add('slider-container-banner');

    for (const key in sliderInfo) { //sliderInfo is the json file
    if (Object.hasOwnProperty.call(sliderInfo, key)) {

        const slide = sliderInfo[key];
        const id = slide.key;
        // console.log(Object.keys(sliderInfo).length, id)
        if (Object.keys(sliderInfo).length >= id) {

           const title = slide.title;
            const image = slide.image;
            const imageAlt = slide.imageAlt;
            const playSvg = slide.playSvg;
            const youTubeVideoUrl = slide.youTubeVideo;

            const slideDiv = document.createElement('div');
            slideDiv.classList.add('slide-block');
            slideDiv.style.cssText = `
            text-align: center;
            `
            const slideDivContent = document.createElement('div');
            slideDivContent.classList.add('slide-content');
            slideDiv.append(slideDivContent);
            slideDivContent.style.cssText = `
            padding: 1.2em 0;
            display: flex;
            flex-direction: column;
            align-items: center;
            position: relative;
            `
            const mainImage = document.createElement('img');
            mainImage.setAttribute('src', image);
            mainImage.setAttribute('alt', imageAlt);
            mainImage.style.cssText = `
            width: 80%;
            `
            const svgImage = document.createElement('img');
            svgImage.classList.add('play-svg');
            svgImage.setAttribute('src', playSvg);
            svgImage.setAttribute('alt', 'play');
            svgImage.style.cssText = `
            width: 30%;
            cursor: pointer;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate3d(-50%, -50%, 0px);
            `
            const anchors = document.createElement('a');
            anchors.setAttribute('href', 'javascript:void(0);');
            anchors.innerHTML = svgImage.outerHTML;

            slideDivContent.append(mainImage, anchors);

            const titleDiv = document.createElement('p');
            titleDiv.classList.add('slide-title');
            titleDiv.style.cssText = `
            font-size: 15px;
            font-weight: bold;
            `
            titleDiv.innerText = title;
            slideDiv.append(titleDiv);

            const videoDivContainer = document.createElement('div');
            videoDivContainer.classList.add('video-div-container');

            const dimmedContainer = document.createElement('div');
            dimmedContainer.classList.add('delivery-popup__dimmed');

            const wrapContainer = document.createElement('div');
            wrapContainer.classList.add('delivery-popup-wrap');
            const layerContainer = document.createElement('div');
            layerContainer.classList.add('delivery-popup-layer', 'popup');
            wrapContainer.append(layerContainer);

            const popupInnerContainer = document.createElement('div');
            popupInnerContainer.classList.add('delivery-popup-inner', 'popup-inner');
            layerContainer.append(popupInnerContainer);

            const closeBtn = document.createElement('button');
            closeBtn.classList.add('close-btn');

            const iframe = document.createElement('iframe');
            iframe.setAttribute('src', `${youTubeVideoUrl}/?autoPlay=1`);
            iframe.setAttribute('title', 'YouTube video player');
            iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
            iframe.setAttribute('allowfullscreen', 'true');
            iframe.style.cssText = `
            width:100%;
            height:100%;
            `
            popupInnerContainer.append(closeBtn);
            videoDivContainer.append(dimmedContainer, wrapContainer, iframe);

            slideDiv.append(videoDivContainer);

            div.append(slideDiv);
        }
      }
    }
    this.addContent(div.outerHTML);
  }

  addContent(sliderHtml) {
    const contentSection = document.querySelector('.samsung-upgrade__content__section');
    const url = window.location.pathname;

    const tagging = (action, type) => {
    const omniType = type || 'microsite';
    const siteCode = 'uk';
    const pageName = `product-on-boarding`;
    const tags = {
      'data-omni-type': omniType,
      'data-omni': `${siteCode}:${pageName}:${action}`,
      'ga-ca': omniType,
      'ga-ac': `${pageName}`,
      'ga-la': `${pageName}:${action}`
    };
    return Object.entries(tags).map(([k, v]) => `${k}="${v}"`).join(' ');
    }

    contentSection.innerHTML = `
    <section class="bannersection-slider buyingpage fold">
      <div class="slider-banner-container">
      <h2 class="main-title">Features, tips and tricks for experienced hands and newcomers alike</h2>
      ${sliderHtml}
    </section>
    `
    $('.slider-container-banner').slick({
      dots: true,
      arrows: true,
      slidesToShow: 4,
      slidesToScroll: 1,
      infinite: true,
      nextArrow: `<button class="slick-next slick-arrow" aria-label="Next" type="button" ${tagging('s22:product-on-boarding')}">Next</button>`,
      prevArrow: `<button class="slick-prev slick-arrow" aria-label="Previous" type="button" ${tagging('s22:product-on-boarding')}">Previous</button>`,
      responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }]
    });


    // if (url.includes('/uk/smartphones/galaxy-s22/buy/') || url.includes('/uk/smartphones/galaxy-s22-ultra/buy/')) {
    // const learnmorepopup = document.querySelector('.adding');
    // learnmorepopup.addEventListener("click", (event) => {
    //     event.preventDefault();
    //     document.querySelector('.js-upgrade-opener').click();
    // });
    // } else {
    //  document.querySelector('.bannersection').style.borderRadius = '30px';
    //  console.log('nothing to add')
    // }

  }

  showPopUp() {

    const tagging = (el, attrs) => {
    for(let key in attrs) {
      el.setAttribute(key, attrs[key]);
    }
  }

    const popUpContent = new PopUpContent();
    const allPlayButtons = document.querySelectorAll('.play-svg');

    allPlayButtons.forEach(button => {

      tagging(button,
      { "data-omni-type"  : "microsite",
        "data-omni"       : `uk:59:buy-page:video-play:on-boarding`,
        "ga-ac"           : "pd buying tool",
        "ga-ca"           : "option click",
        "ga-la"           : `tariff:apply`
      });

      button.addEventListener('click', (event) => {
        const path = event.path || (event.composedPath && event.composedPath());
        popUpContent.openPopUp(path[3].children[2].children[2].attributes[0].value);
      })

    })
  }

  addFooter() {
    const url = window.location.pathname;
    const showRooomFooter = document.querySelector(".footer-left");
    const buyPageFooter = document.querySelector('.hubble-price-bar-disclaimer-text');
    const showroomFooterContent = document.createElement('p');
    showroomFooterContent.innerHTML = ``;

    if (url.includes('/uk/smartphones/galaxy-s22/showroom/') || url.includes('/uk/smartphones/galaxy-s22-ultra/showroom/')) {
    showRooomFooter.append(showroomFooterContent);
    } else if (url.includes('/uk/smartphones/galaxy-s22/buy/') || url.includes('/uk/smartphones/galaxy-s22-ultra/buy/')) {
    showroomFooterContent.style.cssText = `
    font-family: "SamsungOne";
    color: #494949;
    font-size: 12px;
    line-height: 18px;
    margin-bottom: 10px;
    `
    buyPageFooter.prepend(showroomFooterContent);
    }

  }

}