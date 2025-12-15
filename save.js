/**
 * 파일명: save.js
 * 설명: 답변 '입력' 버튼 클릭 시 저장 및 수정 가능, 모든 질문 답변 시 즉시 매뉴얼 표시 및 JPEG 저장 기능 추가
 */

// 매뉴얼 템플릿 생성 함수
function generateManualText(answers) {
    const a1 = answers['1']; 
    const a2 = answers['2']; 
    const a3 = answers['3']; 
    const a4 = answers['4']; 
    const a5 = answers['5']; 
    const a6 = answers['6']; 
    const a7 = answers['7']; 
    const a8 = answers['8']; 
    const a9 = answers['9']; 
    const a10 = answers['10']; 
    const a11 = answers['11']; 
    const a12 = answers['12']; 
    const a13 = answers['13']; 
    const a14 = answers['14']; 
    const a15 = answers['15']; 

    const manualText = `
        <header class="manual-header">
           
            <p class="manual-date">근사한 생일을 보낼 준비가 다 되었나요?</p>
            <hr class="divider">
        </header>

        <section class="manual-actions">
          
            <p class="intro-paragraph">파티 준비에 앞서 먼저 <strong data-answer="8">${a8}</strong>을 꺼내 입읍시다.</p>
            <p class="intro-paragraph">오늘은 <strong data-answer="13">${a13}</strong>에 들어가지 말아보는거에요!</p>
            

            <ul class="action-list">
                <li>음…먼저 <strong data-answer="1">${a1}</strong> 색으로 방을 꾸며보면 어떨까요?</li>
                <li><strong data-answer="7">${a7}</strong>도 옆에 꼭 두고요.</li>
                <li><strong data-answer="2">${a2}</strong>을/를 틀어도 좋을 것 같습니다.</li>
                <li>오랜만에 <strong data-answer="10">${a10}</strong>을 보는 시간을 가져도 좋을 것 같아요.</li>
            </ul>


            <ul class="action-list">
                <li>잠깐 밖에 나가게 된다면, 카페에 가서 <strong data-answer="11">${a11}</strong>을/를 사오는 건 어떨까요?</li>
                <li>집에 돌아오는 길에 <strong data-answer="12">${a12}</strong>도 잠깐 들러보세요!</li>
                <li>시간이 된다면 <strong data-answer="6">${a6}</strong>에게 잠깐 전화해봐도 좋을 것 같아요.</li>
            </ul>


            <ul class="action-list">
                <li>이렇게 소중한 날, 저녁으로 <strong data-answer="3">${a3}</strong>은 어때요?</li>
                <li>아니면 오늘 <strong data-answer="4">${a4} 하기</strong>를 해보는 건 어때요?</li>
                <li><strong data-answer="5">${a5} 하기</strong>를 해봐도 좋고요!</li>
            </ul>
        </section>

        <footer class="manual-footer">
            <hr class="divider">
            <p class="intro-paragraph">생일의 마무리는 <strong data-answer="14">${a14}</strong> 하며 가장 근사하게 끝내보세요.</p>
            <p class="intro-paragraph">10년 후의 당신이 해주는 위로, <strong data-answer="15">${a15}</strong>을 스스로에게 말하고,</p>
            <p class="intro-paragraph">당신의 가장 중요한 가치인 <strong data-answer="9">${a9}</strong>을 되새기며,</p>

            <blockquote class="final-quote">
                <p>당신의 생일은 이 세상 무엇과도 바꿀 수 없이 <br> 완벽한 하루가 될 것입니다.</p>
                <p>가장 가깝고, 가장 오래된 친구인 자기자신이 <br> 가장 축하해주는 생일일테니까요!</p>
                <p class="congratulations">진정한 행복을 찾은 당신, <br> 생일 축하합니다.</p>
            </blockquote>
           
        </footer>
    `;
    return manualText;
}

// 텍스트 영역 높이 자동 조절 함수
function autoResizeTextarea(textarea) {
    textarea.style.height = 'auto';
    textarea.style.height = (textarea.scrollHeight) + 'px';
}

/**
 * 매뉴얼 결과 영역을 캡처하여 JPEG 파일로 다운로드합니다.
 */
function downloadManualAsImage() {
    // html2canvas 라이브러리가 로드되었는지 확인
    if (typeof html2canvas === 'undefined') {
        alert('이미지 저장 라이브러리(html2canvas)가 로드되지 않았습니다.');
        return;
    }
    
    const resultElement = document.getElementById('resultContainer');
    const downloadArea = document.getElementById('downloadArea');
    
    // 캡처 전, 다운로드 버튼 영역은 숨겨서 이미지에 포함되지 않게 합니다.
    downloadArea.style.opacity = '0';
    
    html2canvas(resultElement, {
        scale: 2, 
        useCORS: true, 
        backgroundColor: '#FBF9F6' // 배경색 명시
    }).then(canvas => {
        const imageURL = canvas.toDataURL("image/jpeg", 0.9); 

        // 다운로드를 위한 임시 링크 생성
        const link = document.createElement('a');
        link.href = imageURL;
        link.download = '나만의_생일_매뉴얼.jpeg';
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // 캡처 후 다운로드 버튼 영역을 다시 표시합니다.
        downloadArea.style.opacity = '1'; 
        alert('매뉴얼이 이미지로 저장되었습니다!');
    }).catch(error => {
        downloadArea.style.opacity = '1'; 
        console.error('이미지 저장 중 오류 발생:', error);
        alert('이미지 저장 중 오류가 발생했습니다. 브라우저 콘솔을 확인해주세요.');
    });
}

let finalAnswers = {}; // 최종 답변을 저장할 전역 객체

// 모든 답변을 확인하고 매뉴얼을 생성/표시하는 최종 함수
function checkAllAnswersAndGenerate() {
    const textareas = document.querySelectorAll('.input-text');
    const resultContainer = document.getElementById('resultContainer');
    const downloadArea = document.getElementById('downloadArea'); // 다운로드 영역 참조

    let allAnswered = true;
    
    // finalAnswers 객체에 모든 질문의 답변이 있는지 확인
    for (let i = 1; i <= textareas.length; i++) {
        if (!finalAnswers[i.toString()] || finalAnswers[i.toString()].trim() === '') {
            allAnswered = false;
            break;
        }
    }

    // 매뉴얼 생성/표시 결정
    if (allAnswered) {
        const manualText = generateManualText(finalAnswers);
        resultContainer.innerHTML = manualText;
        
        // 질문 영역 숨기기
        document.getElementById('manualForm').style.display = 'none';

        // 매뉴얼 및 다운로드 버튼 표시
        resultContainer.classList.add('visible');
        downloadArea.style.display = 'block'; 
        setTimeout(() => { downloadArea.style.opacity = '1'; }, 100); // 부드러운 표시

        // 매뉴얼이 생성되면 스크롤을 결과 위치로 이동
        resultContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });

    } else {
        // 답변이 불완전하면 매뉴얼 숨김 및 질문 영역 표시
        document.getElementById('manualForm').style.display = 'block';
        resultContainer.classList.remove('visible');
        
        // 다운로드 버튼 숨김
        downloadArea.style.opacity = '0';
        downloadArea.style.display = 'none'; 
    }
}


// DOM 로드 완료 후 초기화
document.addEventListener('DOMContentLoaded', () => {
    const textareas = document.querySelectorAll('.input-text');

    // 1. Textarea 높이 자동 조절 이벤트 추가
    textareas.forEach(textarea => {
        textarea.addEventListener('input', () => {
            autoResizeTextarea(textarea);
        });
        autoResizeTextarea(textarea); // 초기 높이 설정
        
        const button = textarea.closest('.input-group').querySelector('.submit-btn');

        // 2. 수정 활성화 로직: 사용자가 필드를 클릭(포커스)하면 버튼을 '수정하기' 모드로 변경
        textarea.addEventListener('focus', () => {
             // finalAnswers에 값이 있고 버튼 문구가 '완료' 상태일 경우
            if (finalAnswers[textarea.getAttribute('data-q')] && button.innerText === '완료') {
                button.innerText = '수정하기';
                button.style.backgroundColor = '#dfbe78'; // 웜톤 골드
                button.style.color = 'white';
            }
        });
        
        // 3. 개별 '입력' 버튼 기능: 답변을 finalAnswers 객체에 저장/수정
        button.addEventListener('click', (e) => {
            e.preventDefault(); 
            const textarea = e.target.closest('.input-group').querySelector('.input-text');
            const qNum = textarea.getAttribute('data-q');
            const button = e.target; // 버튼 자체를 참조

            if (textarea.value.trim() === '') {
                alert('답변을 입력해 주세요.');
                return;
            }
            
            // 답변을 최종 저장 객체에 기록 (수정 시 덮어쓰기)
            finalAnswers[qNum] = textarea.value.trim();
            
            // 버튼 상태를 '완료'로 변경
            button.innerText = '완료';
            
            // 인라인 스타일을 웜톤 골드색으로 업데이트
            button.style.backgroundColor = '#dfbe78'; 
            button.style.color = 'white'; 
            
            button.disabled = false; // 수정 가능 상태 유지

            alert(`질문 ${qNum}의 답변이 저장/수정되었습니다!`);
            
            // 다음 입력 필드로 자동 포커스 이동 (사용자 편의성 향상)
            const nextTextarea = textarea.closest('.question-item').nextElementSibling?.querySelector('.input-text');
            if (nextTextarea) {
                nextTextarea.focus();
            }

            // 모든 답변이 완료되었는지 확인하고 매뉴얼 표시
            checkAllAnswersAndGenerate(); 
        });
    });
    
    // 4. 다운로드 버튼에 이벤트 연결 (HTML에서 추가된 ID 사용)
    const downloadBtn = document.getElementById('downloadManualBtn');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', downloadManualAsImage);
    }
    
    // 초기 매뉴얼 상태 확인
    checkAllAnswersAndGenerate(); 
});