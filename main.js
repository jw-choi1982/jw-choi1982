/**
 * AI 인테리어 변환 - 메인 로직
 */

document.addEventListener('DOMContentLoaded', () => {
    const dropZone = document.getElementById('drop-zone');
    const imageUpload = document.getElementById('image-upload');
    const previewImage = document.getElementById('preview-image');
    const uploadPlaceholder = document.getElementById('upload-placeholder');
    const transformBtn = document.getElementById('transform-btn');
    const styleSelect = document.getElementById('style-select');
    
    const inputSection = document.getElementById('input-section');
    const loadingSection = document.getElementById('loading-section');
    const resultSection = document.getElementById('result-section');
    
    const resultImage = document.getElementById('result-image');
    const downloadBtn = document.getElementById('download-btn');
    const retryBtn = document.getElementById('retry-btn');

    let base64Image = null;

    // 업로드 영역 클릭 시 파일 선택창 열기
    dropZone.addEventListener('click', () => imageUpload.click());

    // 파일 선택 시 처리
    imageUpload.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            handleFile(file);
        }
    });

    // 드래그 앤 드롭 처리
    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.classList.add('drag-over');
    });

    dropZone.addEventListener('dragleave', () => {
        dropZone.classList.remove('drag-over');
    });

    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.classList.remove('drag-over');
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            handleFile(file);
        }
    });

    function handleFile(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            base64Image = e.target.result;
            previewImage.src = base64Image;
            previewImage.classList.remove('hidden');
            uploadPlaceholder.classList.add('hidden');
            transformBtn.disabled = false;
        };
        reader.readAsDataURL(file);
    }

    // 변환하기 버튼 클릭
    transformBtn.addEventListener('click', async () => {
        if (!base64Image) return;

        const selectedStyle = styleSelect.value;
        
        // 화면 전환
        inputSection.classList.add('hidden');
        loadingSection.classList.remove('hidden');

        try {
            const response = await fetch('https://generateinteriorv2-vtqdgqeuwa-uc.a.run.app', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                // ▼ 바로 이 부분이 지워져 있었습니다! 서버와 이름도 완벽히 맞췄습니다.
                body: JSON.stringify({
                    imageUrl: base64Image, 
                    prompt: selectedStyle
                })
            });

            if (!response.ok) {
                throw new Error('API 요청에 실패했습니다.');
            }

            const data = await response.json();
            
            if (data.resultImage) {
                resultImage.src = data.resultImage;
                loadingSection.classList.add('hidden');
                resultSection.classList.remove('hidden');
            } else {
                throw new Error('결과 이미지를 받지 못했습니다.');
            }

        } catch (error) {
            console.error('Error:', error);
            alert('오류가 발생했습니다: ' + error.message);
            loadingSection.classList.add('hidden');
            inputSection.classList.remove('hidden');
        }
    });

    // 다시 하기 버튼
    retryBtn.addEventListener('click', () => {
        resultSection.classList.add('hidden');
        inputSection.classList.remove('hidden');
        
        // 업로드 창 초기화
        base64Image = null;
        previewImage.classList.add('hidden');
        uploadPlaceholder.classList.remove('hidden');
        transformBtn.disabled = true;
        imageUpload.value = '';
    });

    // 다운로드 버튼
    downloadBtn.addEventListener('click', () => {
        const link = document.createElement('a');
        link.href = resultImage.src;
        link.download = 'ai-interior-result.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
});