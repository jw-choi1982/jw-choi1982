const mbtiSajuData = {
    "INTJ": {
        "title": "용의주도한 전략가",
        "description": "당신은 미래를 예측하는 능력이 뛰어나며, 거대한 계획을 세우고 실행하는 데 능숙합니다. 사주에서는 큰 권력을 쥐거나 중요한 결정을 내리는 위치에 오를 운명입니다."
    },
    "INTP": {
        "title": "논리적인 사색가",
        "description": "새로운 지식과 아이디어에 대한 탐구심이 강하며, 복잡한 문제를 논리적으로 해결하는 것을 즐깁니다. 학문이나 연구 분야에서 두각을 나타낼 가능성이 높습니다."
    },
    // ... more MBTI data
};

const mbtiSelect = document.getElementById('mbti-select');
const showResultBtn = document.getElementById('show-result-btn');
const resultDiv = document.getElementById('result');
const resultTitle = document.getElementById('result-title');
const resultDescription = document.getElementById('result-description');

showResultBtn.addEventListener('click', () => {
    const selectedMbti = mbtiSelect.value;
    if (selectedMbti && mbtiSajuData[selectedMbti]) {
        const sajuData = mbtiSajuData[selectedMbti];
        resultTitle.textContent = sajuData.title;
        resultDescription.textContent = sajuData.description;
        resultDiv.classList.remove('hidden');
    } else {
        alert('MBTI를 선택해주세요.');
    }
});
