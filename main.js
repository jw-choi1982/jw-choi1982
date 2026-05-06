/**
 * 명리전생 - 메인 로직
 */

// 1. 상수 정의
const GAN = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"];
const JI = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"];

const ELEMENT_MAP = {
    "甲": "목", "乙": "목", "寅": "목", "卯": "목",
    "丙": "화", "丁": "화", "巳": "화", "午": "화",
    "戊": "토", "己": "토", "辰": "토", "戌": "토", "丑": "토", "未": "토",
    "庚": "금", "辛": "금", "申": "금", "酉": "금",
    "壬": "수", "癸": "수", "子": "수", "亥": "수"
};

// 2. 전생 데이터베이스
const PAST_LIFE_ARCHETYPES = [
    {
        title: "바람을 벗 삼은 고고한 학자",
        past: "깊은 산속 서원에서 평생을 학문에 정진하던 선비였습니다. 권력보다는 자연의 이치와 마음의 평안을 중시하며, 많은 제자들에게 지혜를 나누어 주었죠.",
        present: "전생의 지적인 기운이 이어져 현생에서도 배움에 대한 열망이 강합니다. 사물을 깊이 관찰하고 논리적으로 사고하는 능력이 탁월하시군요.",
        future: "당신의 지식을 세상과 나누는 일을 하게 될 것입니다. 기록이나 교육을 통해 많은 이들에게 영감을 주는 등불 같은 존재가 될 운명입니다.",
        advice: "가끔은 머릿속 생각에서 벗어나 몸을 움직여 보세요. 지혜와 실천이 만날 때 당신의 운은 더욱 강력해집니다.",
        dominantElement: "목",
        type: "human"
    },
    {
        title: "밀림을 호령하던 백두산 호랑이",
        past: "험준한 산맥을 지배하던 영험한 호랑이었습니다. 당신의 포효는 산을 울렸고, 당신은 숲의 질서를 유지하는 수호신이자 절대적인 강자였습니다.",
        present: "누구에게도 굽히지 않는 당당함과 카리스마가 느껴집니다. 혼자 있는 시간을 즐기면서도 필요한 순간에는 압도적인 존재감을 드러내는 분이시군요.",
        future: "독자적인 영역에서 정점에 오르게 될 것입니다. 남들이 가보지 않은 길을 개척하며 자신만의 왕국을 건설하는 지도자의 삶이 기다리고 있습니다.",
        advice: "강함 뒤에 숨겨진 부드러움이 당신의 진짜 무기입니다. 주변을 포용하는 자애로움을 갖춘다면 천하가 당신의 편이 될 것입니다.",
        dominantElement: "목",
        type: "animal"
    },
    {
        title: "전장을 호령하던 불패의 장수",
        past: "드넓은 대지를 누비며 나라를 지키던 용맹한 장군이었습니다. 뜨거운 열정과 책임감으로 수많은 병사들을 이끌며 불가능해 보이는 승리를 쟁취했죠.",
        present: "추진력과 결단력이 매우 뛰어납니다. 한번 정한 목표는 끝까지 밀어붙이는 에너지가 있으며, 주변 사람들에게 신뢰를 주는 리더의 기질을 타고났습니다.",
        future: "큰 조직이나 프로젝트의 중심에서 변화를 주도하게 될 것입니다. 당신의 용기 있는 선택이 많은 이들의 삶을 긍정적인 방향으로 바꿀 것입니다.",
        advice: "속도보다 방향이 중요할 때가 있습니다. 가끔은 멈춰 서서 전략을 점검하는 여유를 가진다면 실패 없는 승리를 거둘 것입니다.",
        dominantElement: "화",
        type: "human"
    },
    {
        title: "하늘을 가르는 불꽃 비늘의 용",
        past: "구름 위를 거닐며 비바람을 다스리던 신비로운 용이었습니다. 타오르는 열정과 범접할 수 없는 신성한 기운으로 세상의 조화를 수호하던 존재였죠.",
        present: "남들과는 다른 독창적인 감각과 뜨거운 열정을 지니고 있습니다. 평범함을 거부하고 항상 새로운 가치를 창조하려는 욕구가 강한 분입니다.",
        future: "세상을 깜짝 놀라게 할 창조적인 업적을 남기게 될 것입니다. 당신의 아이디어가 빛을 발하여 많은 이들의 찬사를 받는 화려한 결실을 맺게 됩니다.",
        advice: "하늘 높이 날아오르는 것도 좋지만, 때로는 땅의 소리에 귀를 기울이세요. 현실적인 토대 위에 세워진 꿈은 결코 무너지지 않습니다.",
        dominantElement: "화",
        type: "animal"
    },
    {
        title: "대륙을 누비던 거상(巨商)",
        past: "실크로드를 따라 진귀한 물건을 나르던 유능한 상인이었습니다. 뛰어난 수완과 신의를 바탕으로 부를 쌓고, 그 부를 이웃과 나누던 덕망 높은 인물이었죠.",
        present: "현실적인 판단력과 경제적 감각이 매우 좋습니다. 사람의 마음을 읽는 능력이 탁월하여 어떤 환경에서도 자신의 자리를 만들어내는 생존력이 강합니다.",
        future: "물질적인 풍요뿐만 아니라 사람을 얻는 큰 성공을 거두게 될 것입니다. 당신의 중재 능력이 빛을 발하여 거대한 네트워크의 중심에 서게 됩니다.",
        advice: "눈앞의 이익보다 먼 미래의 가치를 보세요. 당신이 뿌린 신의의 씨앗은 훗날 감당할 수 없을 만큼 큰 열매로 돌아올 것입니다.",
        dominantElement: "토",
        type: "human"
    },
    {
        title: "대지를 지키는 영험한 황소",
        past: "풍요로운 대지를 일구며 마을의 안녕을 책임지던 영물 황소였습니다. 당신의 묵묵한 성실함은 척박한 땅을 옥토로 바꾸는 기적을 만들어냈습니다.",
        present: "한결같은 성실함과 인내심을 지니고 있습니다. 겉으로는 조용해 보이지만 내면에는 그 누구보다 단단한 의지와 책임감을 품고 있는 듬직한 분입니다.",
        future: "오랜 시간 공들여온 일에서 찬란한 결실을 보게 될 것입니다. 화려하지는 않아도 시간이 갈수록 가치가 높아지는 견고한 성을 쌓게 될 운명입니다.",
        advice: "자신의 수고를 너무 낮게 평가하지 마세요. 가끔은 자신을 위해 화려한 휴식을 선물하는 것도 대지의 기운을 보충하는 좋은 방법입니다.",
        dominantElement: "토",
        type: "animal"
    },
    {
        title: "조정을 움직이던 명재상",
        past: "임금의 곁에서 나라의 기틀을 세우던 냉철하고 정의로운 정치가였습니다. 사리사욕에 흔들리지 않는 판단력으로 세상의 질서를 바로잡던 인물이었죠.",
        present: "원칙과 명예를 소중히 여기는 강직한 성품입니다. 옳고 그름이 분명하며, 체계적이고 분석적인 접근으로 문제를 해결하는 데 능숙하시군요.",
        future: "중요한 의사결정을 내리는 책임 있는 위치에 오르게 될 것입니다. 당신의 공정한 판단이 사회의 기준이 되고, 많은 이들의 존경을 받는 원로의 삶을 살게 됩니다.",
        advice: "차가운 이성 뒤에 따뜻한 감성을 한 스푼 더해 보세요. 법보다 마음이 먼저 움직일 때 당신의 권위는 비로소 완성됩니다.",
        dominantElement: "금",
        type: "human"
    },
    {
        title: "설원을 누비는 은빛 늑대",
        past: "끝없는 설원을 달리며 무리를 이끌던 지혜로운 늑대였습니다. 날카로운 직관과 강한 결속력으로 거친 환경 속에서도 동료들을 지켜낸 고귀한 리더였죠.",
        present: "독립적이면서도 자신이 정한 울타리 안의 사람들에게는 한없이 헌신적입니다. 예리한 감각으로 위험을 미리 감지하고 대처하는 능력이 뛰어납니다.",
        future: "자신만의 독자적인 팀이나 커뮤니티를 성공적으로 이끌게 될 것입니다. 당신의 흔들리지 않는 중심이 많은 이들에게 안식처와 이정표가 되어줄 것입니다.",
        advice: "혼자 모든 짐을 짊어지려 하지 마세요. 당신이 믿고 의지할 수 있는 동료들과 힘을 합칠 때 당신의 숲은 더욱 넓어질 것입니다.",
        dominantElement: "금",
        type: "animal"
    },
    {
        title: "만인을 치유하던 신비로운 의원",
        past: "약초 하나로 생명을 살려내던 자애로운 의원이었습니다. 신분과 귀천을 가리지 않고 모든 생명을 귀하게 여겼던 성자(聖者)와 같은 삶을 살았습니다.",
        present: "타인의 아픔에 공감하는 능력이 탁월하고 치유의 에너지를 지니고 있습니다. 당신 곁에 있는 것만으로도 사람들은 위안을 얻고 마음의 평안을 찾습니다.",
        future: "많은 이들의 몸과 마음을 어루만지는 고귀한 사명을 완수하게 될 것입니다. 당신의 이름이 널리 알려져 사랑과 감사의 인사를 한몸에 받는 빛나는 삶입니다.",
        advice: "남을 돌보는 만큼 자신을 돌보는 것에도 인색하지 마세요. 당신의 샘물이 마르지 않아야 더 많은 목마른 영혼들을 적셔줄 수 있습니다.",
        dominantElement: "수",
        type: "human"
    },
    {
        title: "심해를 유영하는 지혜로운 고래",
        past: "깊은 바다를 여행하며 태고의 지혜를 간직한 거대한 고래였습니다. 당신의 울림은 바다 전체에 퍼져나갔고, 당신은 생명의 경이로움을 상징하는 존재였죠.",
        present: "생각이 깊고 포용력이 넓어 웬만한 일에는 흔들리지 않는 평온함을 지니고 있습니다. 보이지 않는 흐름을 읽는 신비로운 통찰력을 가진 분입니다.",
        future: "세상의 보이지 않는 진실을 알리고 평화를 전파하는 메신저가 될 것입니다. 당신의 깊은 울림이 많은 이들의 영혼을 깨우는 거대한 파동이 될 운명입니다.",
        advice: "당신의 깊은 생각을 세상 밖으로 조금 더 적극적으로 표현해 보세요. 당신의 목소리가 들릴 때 비로소 세상은 더 아름다운 화음을 내게 됩니다.",
        dominantElement: "수",
        type: "animal"
    }
];

// 3. UI 컨트롤러
document.addEventListener('DOMContentLoaded', () => {
    const sajuForm = document.getElementById('saju-form');
    const inputSection = document.getElementById('input-section');
    const loadingSection = document.getElementById('loading-section');
    const resultSection = document.getElementById('result-section');
    const retryBtn = document.getElementById('retry-btn');
    const loadingText = document.getElementById('loading-text');

    // 생년월일 드롭다운 초기화
    const yearSelect = document.getElementById('birth-year');
    const monthSelect = document.getElementById('birth-month');
    const daySelect = document.getElementById('birth-day');

    const initDateDropdowns = () => {
        const currentYear = new Date().getFullYear();
        // 연도 (1900 ~ 현재)
        for (let y = currentYear; y >= 1900; y--) {
            const opt = document.createElement('option');
            opt.value = y;
            opt.textContent = `${y}년`;
            yearSelect.appendChild(opt);
        }
        // 월
        for (let m = 1; m <= 12; m++) {
            const opt = document.createElement('option');
            opt.value = m;
            opt.textContent = `${m}월`;
            monthSelect.appendChild(opt);
        }
        // 일 초기화 (기본 31일)
        updateDays();
    };

    const updateDays = () => {
        const year = parseInt(yearSelect.value);
        const month = parseInt(monthSelect.value);
        const daysInMonth = new Date(year, month, 0).getDate();
        
        const currentDay = daySelect.value;
        daySelect.innerHTML = '';
        for (let d = 1; d <= daysInMonth; d++) {
            const opt = document.createElement('option');
            opt.value = d;
            opt.textContent = `${d}일`;
            if (d == currentDay) opt.selected = true;
            daySelect.appendChild(opt);
        }
    };

    yearSelect.addEventListener('change', updateDays);
    monthSelect.addEventListener('change', updateDays);
    
    initDateDropdowns();

    const loadingMessages = [
        "천문의 기운을 읽는 중...",
        "사주팔자의 실타래를 푸는 중...",
        "전생의 기억을 소환하고 있습니다...",
        "운명의 지도를 그리는 중..."
    ];

    sajuForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const year = yearSelect.value;
        const month = monthSelect.value.padStart(2, '0');
        const day = daySelect.value.padStart(2, '0');
        const birthDate = `${year}-${month}-${day}`;
        
        const calendar = document.querySelector('input[name="calendar"]:checked').value;
        const birthTime = document.getElementById('birth-time').value;
        const gender = document.querySelector('input[name="gender"]:checked').value;

        startAnalysis(name, birthDate, calendar, birthTime, gender);
    });

    retryBtn.addEventListener('click', () => {
        resultSection.classList.remove('active');
        inputSection.classList.add('active');
    });

    function startAnalysis(name, date, calendar, time, gender) {
        inputSection.classList.remove('active');
        loadingSection.classList.add('active');

        let msgIndex = 0;
        const msgInterval = setInterval(() => {
            msgIndex++;
            if (msgIndex < loadingMessages.length) {
                loadingText.innerText = loadingMessages[msgIndex];
            } else {
                clearInterval(msgInterval);
                showResult(name, date, calendar, time, gender);
            }
        }, 800);
    }

    function showResult(name, date, calendar, time, gender) {
        // 1. 간이 사주 계산
        const saju = calculateSaju(date, calendar, time);
        
        // 2. 결과 렌더링
        document.getElementById('yeon-pillar').innerText = saju.yeon;
        document.getElementById('wol-pillar').innerText = saju.wol;
        document.getElementById('il-pillar').innerText = saju.il;
        document.getElementById('si-pillar').innerText = saju.si;

        // 3. 전생 매핑
        const pastLife = getPastLife(saju);
        document.getElementById('past-life-title').innerText = `${name}님, 당신의 운명 분석`;
        document.getElementById('past-life-story').innerText = pastLife.past;
        document.getElementById('present-life-story').innerText = pastLife.present;
        document.getElementById('future-path-story').innerText = pastLife.future;
        document.getElementById('present-advice').innerText = pastLife.advice;

        loadingSection.classList.remove('active');
        resultSection.classList.add('active');
    }

    function calculateSaju(date, calendar, time) {
        // 날짜 데이터를 기반으로 결정론적 해시 생성
        const d = new Date(date);
        let seed = d.getFullYear() + d.getMonth() + d.getDate() + (time === 'unknown' ? 7 : parseInt(time));
        
        // 음력일 경우 시드값 조정 (간이 로직)
        if (calendar === 'lunar') {
            seed += 100; 
        }

        const getGanJi = (s) => GAN[s % 10] + JI[s % 12];

        return {
            yeon: getGanJi(d.getFullYear() + 5), // 대략적인 연도 매핑
            wol: getGanJi(d.getFullYear() + d.getMonth() + (calendar === 'lunar' ? 5 : 2)),
            il: getGanJi(seed),
            si: time === 'unknown' ? "??" : getGanJi(seed + parseInt(time) + 9)
        };
    }

    function getPastLife(saju) {
        // 일주(일간)의 오행을 추출
        const ilgan = saju.il[0];
        const element = ELEMENT_MAP[ilgan] || "토";
        
        // 해당 오행을 가진 후보군 추출
        const candidates = PAST_LIFE_ARCHETYPES.filter(a => a.dominantElement === element);
        
        if (candidates.length === 0) return PAST_LIFE_ARCHETYPES[2];

        // 지지(JI)의 인덱스를 활용하여 인간(0) 또는 동물(1) 선택 (결정론적)
        const jiIndex = JI.indexOf(saju.il[1]);
        const selectionIndex = jiIndex % candidates.length;
        
        return candidates[selectionIndex];
    }
});
