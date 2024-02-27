function counter(cnt) {
    const countryReady = "Argentina,Australia,Austria,Bahrain,Belgium,Bolivia Plurinational State of,Brazil,Bulgaria,Canada,Chile,Colombia,Costa Rica,Croatia,Cyprus,Czech Republic,Denmark,Ecuador,ElSalvador,Finland,France,Germany,Greece,Guatemala,Honduras,HongKong,Hungary,Iceland,India,Indonesia,Ireland,Israel,Italy,Japan,Korea,Kuwait,Lebanon,Luxembourg,Mainland China,Malaysia,Malta,Mexico,Netherlands,NewZealand,Nicaragua,Norway,Oman,Panama,Paraguay,Peru,Poland,Portugal,Qatar,Romania,Russia,Saudi Arabia,Singapore,Slovakia,Slovenia,South Africa,Spain,Sweden,Switzerland,Taiwan,Thailand,Turkey,Ukraine,United Arab Emirates,United Kingdom,United States,Uruguay".split(",");
    const prime = countryReady.indexOf(cnt);
    return cnt ? [prime * 10, prime] : 0;


}
export default counter;