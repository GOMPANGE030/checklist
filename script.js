// DOMContentLoaded 이벤트: HTML 문서가 모두 로드된 후 실행
document.addEventListener('DOMContentLoaded', function() {
    // 체크리스트 UL 요소 선택
    const checklist = document.getElementById('checklist');
    
    // 리스트 내 체크박스 변화 이벤트 리스너 추가
    checklist.addEventListener('change', function(event) {
        // change 이벤트가 input[type="checkbox"]에 의해 발생했는지 확인
        if (event.target && event.target.matches('input[type="checkbox"]')) {
            // 체크박스 ID와 상태 출력 (실제 개발 시 다른 처리를 추가할 수 있음)
            console.log(event.target.id + " 는 " + (event.target.checked ? "체크됨" : "체크 해제됨"));
        }
    });
});
