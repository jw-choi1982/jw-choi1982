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
        story: "당신은 전생에 깊은 산속 서원에서 학문에 정진하던 선비였습니다. 권력이나 부귀영화보다는 자연의 이치와 마음의 평안을 중시했군요. 많은 이들이 당신의 지혜를 구하러 먼 길을 찾아왔으며, 당신이 남긴 시 한 자락은 어느 마을의 전설이 되기도 했습니다.",
        advice: "현생에서도 지적 호기심이 강하고 독립적인 성향을 가지고 계시군요. 때로는 너무 완벽을 기하기보다 주변 사람들과 소소한 즐거움을 나누는 것이 운을 더 좋게 만듭니다.",
        dominantElement: "목",
        type: "human"
    },
    {
        title: "밀림을 호령하던 백두산 호랑이",
        story: "당신은 전생에 험준한 산맥을 지배하던 영험한 호랑이었습니다. 당신의 포효 한 번에 온 산의 짐승들이 숨을 죽였고, 당신은 산의 주인이자 수호신으로서 경외의 대상이었습니다. 거침없는 용맹함과 고독한 카리스마를 지닌 존재였습니다.",
        advice: "타고난 존재감이 강하고 추진력이 대단합니다. 하지만 때로는 주변을 압도하는 기운이 타인에게 부담을 줄 수 있으니, 부드러운 미소로 당신의 강함을 감싸 안으세요.",
        dominantElement: "목",
        type: "animal"
    },
    {
        title: "전장을 호령하던 불패의 장수",
        story: "당신은 전생에 드넓은 대지를 달리며 나라를 지키던 용맹한 장군이었습니다. 뜨거운 열정과 책임감으로 수많은 병사들의 우상이 되었죠. 당신의 검술은 번개와 같았고, 당신의 목소리는 적들을 전율케 했습니다. 정의를 위해 목숨을 아끼지 않았던 숭고한 영혼이었습니다.",
        advice: "리더십이 뛰어나고 추진력이 좋지만, 때로는 강한 고집이 주변을 힘들게 할 수 있습니다. 부드러운 소통이 당신의 카리스마를 더욱 빛나게 해줄 것입니다.",
        dominantElement: "화",
        type: "human"
    },
    {
        title: "하늘을 가르는 불꽃 비늘의 용",
        story: "당신은 전생에 구름 위를 거닐며 비바람을 다스리던 전설 속의 용이었습니다. 타오르는 불꽃 같은 열정과 신비로운 기운을 지닌 당신은 세상의 변화를 주도하는 영물(靈物)이었습니다. 당신이 움직일 때마다 하늘과 땅의 기운이 요동쳤습니다.",
        advice: "창의적이고 열정적인 에너지가 넘쳐납니다. 원대한 꿈을 꾸는 것은 좋지만, 가끔은 발을 지면에 딛고 현실적인 계획을 세우는 것이 당신의 이상을 실현하는 데 도움이 될 것입니다.",
        dominantElement: "화",
        type: "animal"
    },
    {
        title: "대륙을 누비던 거상(巨商)",
        story: "당신은 전생에 실크로드를 따라 진귀한 물건들을 나르던 유능한 상인이었습니다. 뛰어난 통찰력과 수완으로 막대한 부를 쌓았으며, 그 부를 통해 굶주린 백성들을 구휼하기도 했습니다. 신의를 목숨보다 소중히 여겼던 당신은 가는 곳마다 환영받는 존재였습니다.",
        advice: "경제적 감각이 뛰어나고 현실적인 판단력이 좋습니다. 기회를 포착하는 능력은 타고났으니, 사람과의 관계에 더 투자한다면 더 큰 성공을 거둘 것입니다.",
        dominantElement: "토",
        type: "human"
    },
    {
        title: "대지를 지키는 영험한 황소",
        story: "당신은 전생에 풍요로운 대지를 일구며 마을의 안녕을 책임지던 영물 황소였습니다. 당신의 묵묵한 성실함과 흔들리지 않는 인내심은 모든 이들에게 평안과 풍요를 가져다주었습니다. 당신은 땅의 기운을 가장 잘 이해하는 듬직한 수호자였습니다.",
        advice: "한결같은 성실함과 신뢰를 주는 성격입니다. 서두르지 않고 당신만의 속도로 나아갈 때 가장 큰 결실을 맺을 수 있습니다. 가끔은 당신의 수고를 알아주는 이들에게 마음껏 어리광을 부려보세요.",
        dominantElement: "토",
        type: "animal"
    },
    {
        title: "조정을 움직이던 명재상",
        story: "당신은 전생에 임금의 곁에서 나라의 기틀을 세우던 냉철하고 정의로운 정치가였습니다. 사리사욕에 흔들리지 않는 단단한 마음과 칼날 같은 판단력으로 부패를 척결했죠. 당신이 만든 법과 제도는 백성들의 삶을 오랫동안 풍요롭게 만들었습니다.",
        advice: "원칙을 중요시하고 공정한 성격입니다. 정의감은 좋으나 때로는 타인의 실수에 조금 더 관 대해지는 포용력을 가진다면 적을 만들지 않고 뜻을 펼칠 수 있습니다.",
        dominantElement: "금",
        type: "human"
    },
    {
        title: "설원을 누비는 은빛 늑대",
        story: "당신은 전생에 끝없는 설원을 달리며 무리를 이끌던 지혜롭고 냉철한 늑대였습니다. 날카로운 직관과 강한 결속력으로 거친 환경 속에서도 가족과 동료를 지켜냈습니다. 당신의 눈빛은 달빛을 닮아 차갑지만 깊은 통찰을 담고 있었습니다.",
        advice: "독립적이면서도 소중한 사람들에게는 한없이 헌신적입니다. 당신의 직관은 매우 예리하므로 스스로의 판단을 믿으세요. 다만, 너무 경계심을 세우기보다 가끔은 마음의 빗장을 풀어보세요.",
        dominantElement: "금",
        type: "animal"
    },
    {
        title: "만인을 치유하던 신비로운 의원",
        story: "당신은 전생에 약초 하나로 죽어가는 생명을 살려내던 자애로운 의원이었습니다. 신분과 귀천에 상관없이 모든 생명을 귀하게 여겼으며, 당신의 손길이 닿는 곳마다 희망의 꽃이 피어났습니다. 사람들의 아픔을 진심으로 공감하던 따뜻한 영혼이었습니다.",
        advice: "공감 능력이 뛰어나고 주변을 잘 챙기는 성격입니다. 남을 돕는 것도 좋지만, 자신의 에너지를 먼저 돌보는 시간을 가져야 더 오래 행복할 수 있습니다.",
        dominantElement: "수",
        type: "human"
    },
    {
        title: "심해를 유영하는 지혜로운 고래",
        story: "당신은 전생에 끝을 알 수 없는 깊은 바다를 여행하며 태고의 지혜를 간직한 거대한 고래였습니다. 당신의 노랫소리는 바다의 기운을 다독였고, 당신의 거대한 몸짓은 생명의 경이로움을 상징했습니다. 넓은 포용력과 평화로운 영혼을 지닌 존재였습니다.",
        advice: "마음이 넓고 깊은 사고를 즐기는 타입입니다. 타인의 고민을 잘 들어주고 감싸주는 능력이 탁월합니다. 때로는 당신의 깊은 속마음을 세상 밖으로 꺼내어 표현할 때 진정한 자유를 느낄 수 있을 것입니다.",
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
        document.getElementById('past-life-title').innerText = `${name}님, 당신은 [${pastLife.title}] 이었습니다.`;
        document.getElementById('past-life-story').innerText = pastLife.story;
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
