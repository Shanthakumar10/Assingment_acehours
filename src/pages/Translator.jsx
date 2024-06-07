import React, {useEffect}from 'react'
import countries from '../components/data'
import '../components/Translator.css'
import { Link } from 'react-router-dom'

const Translator = () => {
  useEffect(() => {
    const fromText = document.querySelector(".from-text");
    const toText = document.querySelector(".to-text");
    const exchageIcon = document.querySelector(".exchange");
    const selectTag = document.querySelectorAll("select");
    const translateBtn = document.querySelector("button");
    selectTag.forEach((tag, id) => {
      for (let country_code in countries) {
       let selected = id == 0
       ? country_code == "en-GB"
         ? "selected"
         : ""
       : country_code == "hi-IN"
       ? "selected"
       : "";
   let option = `<option ${selected} value="${country_code}">${countries[country_code]}</option>`;
   tag.insertAdjacentHTML("beforeend", option);
      }
    });

    exchageIcon.addEventListener("click", () => {
      let tempText = fromText.value;
      let tempLang = selectTag[0].value;
      fromText.value = toText.value;
      toText.value = tempText;
      selectTag[0].value = selectTag[1].value;
      selectTag[1].value = tempLang;
    });

    fromText.addEventListener("keyup", () => {
      if (!fromText.value) {
        toText.value = "";
      }
    });

    translateBtn.addEventListener("click", () => {
      let text = fromText.value.trim();
      let translateFrom = selectTag[0].value;
      let translateTo = selectTag[1].value;
      if (!text) return;
      toText.setAttribute("placeholder", "Translating...");
      let apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;
      fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => {
        toText.value = data.responseData.translatedText;
        data.matches.forEach((data) => {
          if (data.id === 0) {
            toText.value = data.translation;
          }
        });
        toText.setAttribute("placeholder", "Translation");
        });
    });
  },[]);
  return (
    <div>
    <div className="container">
        <div className="wrapper">
          <div className="text-input">
            <textarea
              spellcheck="false"
              className="from-text"
              placeholder="Enter text"
            ></textarea>
            <textarea
              spellcheck="false"
              readonly
              disabled
              className="to-text"
              placeholder="Translation"
            ></textarea>
          </div>
          <ul className="controls">
            <li className="row from">
              <div className="icons">
                <i id="from" className="fas fa-volume-up"></i>
                <i id="from" className="fas fa-copy"></i>
              </div>
              <select></select>
            </li>
            <li className="exchange">
              <i className="fas fa-exchange-alt"></i>
            </li>
            <li className="row to">
              <select></select>
              <div className="icons">
                <i id="to" className="fas fa-volume-up"></i>
                <i id="to" className="fas fa-copy"></i>
              </div>
            </li>
          </ul>
        </div>
        <button>Translate Text</button>
      </div>
      <Link className="next" to='/Movie'>Next Page</Link>
      </div>
  )
}

export default Translator