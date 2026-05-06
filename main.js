/**
 * 전생코딩 - 메인 로직
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
        title: "푸른 숲의 수호자, 청룡(靑龍)",
        image: "https://images.unsplash.com/photo-1577493322601-3ae1fbd27bc6?auto=format&fit=crop&q=80&w=800",
        past: "당신은 전생에 구름을 헤치며 동방의 푸른 숲을 다스리던 신성한 청룡이었습니다. 생명의 기운을 주관하며 대지에 봄을 불러오는 고귀한 존재였죠.",
        present: "청룡의 기운이 현생으로 이어져, 당신은 새로운 일을 시작하는 창의력과 굴하지 않는 강인한 생명력을 지닌 '인간 청룡'으로 살아가고 있습니다.",
        future: "세상에 활력을 불어넣는 지도적인 위치에 오르게 될 것입니다. 당신의 성장이 주변 사람들을 함께 일으켜 세우는 거대한 숲을 이루게 됩니다.",
        advice: "용의 승천에는 구름과 비가 필요하듯, 주변 사람들의 도움을 기꺼이 받아들이세요. 협력이 당신의 날개가 될 것입니다.",
        dominantElement: "목",
        type: "divine"
    },
    {
        title: "산맥의 제왕, 백두산 호랑이(虎)",
        image: "https://images.unsplash.com/photo-1508817628294-5a453fa0b8fb?auto=format&fit=crop&q=80&w=800",
        past: "험준한 산맥을 호령하며 산의 질서를 수호하던 영험한 호랑이었습니다. 당신의 포효는 악한 기운을 물리치고 선량한 이들을 지키는 위엄의 상징이었습니다.",
        present: "호랑이의 용맹함과 고독한 카리스마가 당신의 내면에 살아있습니다. 독립심이 강하고 정의로워, 어떤 어려움 앞에서도 당당하게 맞서는 분이시군요.",
        future: "독자적인 영역에서 정점에 올라 자신만의 왕국을 건설하게 될 것입니다. 당신의 강력한 추진력이 불가능해 보이던 목표를 현실로 바꿔놓을 운명입니다.",
        advice: "강한 발톱은 꼭 필요할 때만 드러내세요. 평소의 부드러운 미소가 당신의 위엄을 더욱 빛나게 해줄 것입니다.",
        dominantElement: "목",
        type: "animal"
    },
    {
        title: "태양을 품은 불사조, 주작(朱雀)",
        image: "https://images.unsplash.com/photo-1590005354167-6da97870c921?auto=format&fit=crop&q=80&w=800",
        past: "타오르는 불꽃 속에서 다시 태어나 하늘을 붉게 물들이던 신비로운 주작이었습니다. 당신이 날개를 펼칠 때마다 세상은 뜨거운 열정과 희망으로 가득 찼습니다.",
        present: "주작의 뜨거운 열정이 현생의 예술적 감각과 화려한 언변으로 나타나고 있습니다. 주변을 밝히는 밝은 에너지와 사람들을 매료시키는 매력을 지닌 분입니다.",
        future: "많은 이들의 주목을 받는 화려한 무대 위에서 당신의 재능을 꽃피우게 될 것입니다. 당신의 이름이 널리 알려져 빛나는 결실을 맺게 되는 삶입니다.",
        advice: "불꽃은 때로 자신을 태우기도 합니다. 열정을 쏟는 만큼 명상과 휴식을 통해 내면의 열기를 다스리는 지혜가 필요합니다.",
        dominantElement: "화",
        type: "divine"
    },
    {
        title: "광야를 달리는 붉은 천마(天馬)",
        image: "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?auto=format&fit=crop&q=80&w=800",
        past: "끝없는 평원을 번개처럼 달리며 바람을 가르던 영험한 붉은 말이었습니다. 지치지 않는 체력과 자유를 향한 갈망으로 대륙의 끝까지 흔적을 남겼죠.",
        present: "천마의 역동적인 기운이 이어져 현생에서도 활동력이 매우 뛰어납니다. 새로운 환경에 빠르게 적응하며, 목표를 향해 거침없이 돌진하는 에너지를 가졌습니다.",
        future: "전 세계를 무대로 활동하며 거침없이 영역을 확장하게 될 것입니다. 당신의 발걸음이 닿는 곳마다 새로운 길이 열리고 변화가 일어나는 역동적인 미래가 기다립니다.",
        advice: "혼자 너무 앞서가면 소중한 이들을 놓칠 수 있습니다. 가끔은 속도를 늦추고 동료들과 보조를 맞추는 여유를 가져보세요.",
        dominantElement: "화",
        type: "animal"
    },
    {
        title: "대지의 성수, 황룡(黃龍)",
        image: "https://images.unsplash.com/photo-1618336753974-aae8e04506aa?auto=format&fit=crop&q=80&w=800",
        past: "천하의 중심에서 오행의 조화를 다스리던 신성한 황룡이었습니다. 모든 생명이 뿌리를 내릴 수 있도록 대지를 비옥하게 가꾸고 질서를 유지하던 중재자였죠.",
        present: "황룡의 포용력과 안정감이 당신의 성품에 녹아 있습니다. 신뢰감이 깊고 중심이 단단하여, 주변 사람들이 의지하고 따르는 듬직한 지도자 역할을 수행하고 계시군요.",
        future: "거대한 자산이나 조직의 중심을 잡는 핵심적인 인물이 될 것입니다. 당신의 중재와 결단이 많은 이들에게 평안과 풍요를 가져다주는 큰 결실을 맺게 됩니다.",
        advice: "중심을 지키는 것은 외로운 일일 수 있습니다. 가끔은 당신의 짐을 내려놓고 대지에 몸을 맡기듯 편안한 휴식을 취해 보세요.",
        dominantElement: "토",
        type: "divine"
    },
    {
        title: "풍요를 부르는 황금 소(牛)",
        image: "https://images.unsplash.com/photo-1545468241-e945e454470d?auto=format&fit=crop&q=80&w=800",
        past: "묵묵히 대지를 일구며 만인에게 풍요를 선사하던 영험한 황금 소였습니다. 당신의 성실한 발걸음이 닿는 곳마다 황금빛 곡식이 자라나던 축복의 상징이었죠.",
        present: "황금 소의 우직함과 풍요로운 기운이 당신의 삶에 깃들어 있습니다. 인내심이 강하고 실속이 있어, 차근차근 부와 명예를 쌓아 올리는 견실한 분입니다.",
        future: "시간이 흐를수록 가치가 높아지는 거대한 성취를 이루게 될 것입니다. 노년으로 갈수록 더욱 풍요롭고 평안한 삶을 누리는 '만석꾼'의 운명을 타고났습니다.",
        advice: "우직함도 좋지만 때로는 유연함이 필요합니다. 고집을 조금만 내려놓으면 더 큰 세상의 흐름이 당신의 품 안으로 들어올 것입니다.",
        dominantElement: "토",
        type: "animal"
    },
    {
        title: "설원의 지배자, 백호(白虎)",
        image: "https://images.unsplash.com/photo-1551009175-15bdf9dcb580?auto=format&fit=crop&q=80&w=800",
        past: "서리가 내린 차가운 숲을 수호하며 악귀를 쫓아내던 신비로운 백호였습니다. 당신의 날카로운 직관과 용맹함은 세상의 부정을 정화하는 빛과 같았습니다.",
        present: "백호의 냉철한 판단력과 예리한 감각이 현생에서도 빛을 발하고 있습니다. 옳고 그름이 분명하며, 위기 상황에서 더욱 빛나는 담력을 지닌 분이시군요.",
        future: "정의를 수호하거나 전문적인 분야에서 최고의 권위를 갖게 될 것입니다. 당신의 공정한 판단이 사회의 기준이 되고 많은 이들에게 존경받는 지도자가 됩니다.",
        advice: "차가운 이성 뒤에 따뜻한 연민을 품으세요. 당신의 칼날이 사랑을 품을 때 비로소 천하를 평정하는 진정한 왕이 될 수 있습니다.",
        dominantElement: "금",
        type: "divine"
    },
    {
        title: "달빛을 품은 은빛 늑대(狼)",
        image: "https://images.unsplash.com/photo-1551009175-15bdf9dcb580?auto=format&fit=crop&q=80&w=800",
        past: "은은한 달빛 아래 무리를 이끌며 지혜를 나누던 영특한 늑대였습니다. 강한 결속력과 날카로운 생존 본능으로 험난한 환경 속에서도 무리의 번영을 지켜냈죠.",
        present: "은빛 늑대의 지혜와 의리가 당신의 인간관계 속에 살아있습니다. 독립적이면서도 소중한 사람들에게는 한없이 헌신적이며, 직관적으로 핵심을 꿰뚫어 봅니다.",
        future: "자신만의 독자적인 커뮤니티나 팀을 성공적으로 이끌어 거대한 네트워크를 형성하게 될 것입니다. 당신의 의리가 자산이 되어 큰 성공을 거두는 미래가 보입니다.",
        advice: "혼자 모든 것을 해결하려 하지 마세요. 당신의 무리와 힘을 합칠 때 당신의 사냥은 항상 성공할 것입니다.",
        dominantElement: "금",
        type: "animal"
    },
    {
        title: "지혜의 화신, 현무(玄武)",
        image: "https://images.unsplash.com/photo-1544971583-a8d544940bb9?auto=format&fit=crop&q=80&w=800",
        past: "깊은 심해의 어둠 속에서 태고의 지혜를 간직하며 세상의 이치를 관장하던 거북과 뱀의 화신, 현무였습니다. 영원한 생명과 고요한 평화의 수호자였죠.",
        present: "현무의 깊은 통찰력과 침착함이 당신의 내면에 흐르고 있습니다. 보이지 않는 흐름을 읽는 능력이 뛰어나며, 어떤 풍파에도 흔들리지 않는 내공을 지닌 분입니다.",
        future: "세상의 보이지 않는 진리를 탐구하거나 정신적인 지도자의 삶을 살게 될 것입니다. 당신의 깊은 지혜가 길을 잃은 많은 영혼에게 이정표가 될 운명입니다.",
        advice: "침묵은 금이지만 때로는 목소리를 내야 합니다. 당신이 간직한 태고의 지혜를 세상에 알릴 때 더 큰 운의 흐름이 시작됩니다.",
        dominantElement: "수",
        type: "divine"
    },
    {
        title: "심해를 유영하는 지혜로운 고래(鯨)",
        image: "https://images.unsplash.com/photo-1551244072-5d12893278ab?auto=format&fit=crop&q=80&w=800",
        past: "끝을 알 수 없는 거대한 바다를 여행하며 생명의 노래를 부르던 신비로운 고래였습니다. 당신의 거대한 몸짓은 바다의 평화를 상징하며 모든 생명을 품었죠.",
        present: "고래의 넓은 포용력과 깊은 감성이 당신의 삶을 풍요롭게 합니다. 타인의 아픔을 진심으로 공감하고 감싸 안는 따뜻한 치유의 에너지를 가진 분이군요.",
        future: "세상을 치유하고 평화를 전파하는 거대한 흐름의 중심이 될 것입니다. 당신의 공감과 사랑이 파동이 되어 전 세계로 퍼져나가는 감동적인 미래가 기다립니다.",
        advice: "바다는 넓지만 가끔은 수면 위로 올라와 숨을 쉬어야 합니다. 타인을 돌보는 만큼 당신 자신의 영혼을 위한 숨구멍을 만들어 주세요.",
        dominantElement: "수",
        type: "animal"
    }
];

// 3. UI 컨트롤러
document.addEventListener('DOMContentLoaded', () => {
    // 테마 설정
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const body = document.body;

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        body.classList.add('light-mode');
        themeIcon.innerText = '☀️';
    }

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('light-mode');
        const isLight = body.classList.contains('light-mode');
        themeIcon.innerText = isLight ? '☀️' : '🌙';
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
    });

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
        "영혼의 데이터베이스에 접속 중...",
        "과거 로그 파일을 스캔하고 있습니다...",
        "운명의 소스코드를 디코딩 중...",
        "아키타입 매핑 시스템 가동..."
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
        
        // 이미지 업데이트
        const animalImg = document.getElementById('animal-img');
        animalImg.src = pastLife.image;
        animalImg.alt = pastLife.title;

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
