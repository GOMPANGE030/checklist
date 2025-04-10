document.addEventListener('DOMContentLoaded', function() {
    // 항목 목록 배열 (✔, ⓑ 기호는 무시하고 텍스트만 기재)
    var items = [
      { id: 'item1', text: '여권 -프린트' },
      { id: 'item2', text: 'e심' },
      { id: 'item3', text: '보험증확인' },
      { id: 'item4', text: '항공권(스마트패스/전자거시기)' },
      { id: 'item5', text: '숙소확인 -프린트' },
      { id: 'item6', text: '트래블카드' },
      { id: 'item7', text: '현금 - 민경이' },
      { id: 'item8', text: '단수이 지하철 예약필요?' },
      { id: 'item9', text: '의약품(타이레놀, 소화제)' },
      { id: 'item10', text: '어댑터(변환기 2개 가져감) ' },
      { id: 'item11', text: '**워치는당일** 충전기(라이트닝/C/워치) ' },
      { id: 'item12', text: '(충전중) 보조배터리' },
      { id: 'item13', text: '돈지갑' },
      { id: 'item14', text: '휴대가방(매는거)' },
      { id: 'item15', text: '안경' },
      { id: 'item16', text: '임냄셰' },
      { id: 'item17', text: '인공눈물' },
      { id: 'item18', text: '셀카봉 - 민경이' },
      { id: 'item19', text: '선구리' },
      { id: 'item20', text: '칫솔세트 ' },
      { id: 'item21', text: '면도기(최근구매) ' },
      { id: 'item22', text: '면도크림' },
      { id: 'item23', text: '컨실러 ' },
      { id: 'item24', text: '로션 ' },
      { id: 'item25', text: '보습썬크림 ' },
      { id: 'item26', text: '향수(소분) ' },
      { id: 'item27', text: '렌즈 3쌍 / 1쌍(착용) ' }
    ];

    var checklist = document.getElementById('checklist');

    // 배열 항목들을 이용해 체크리스트 항목을 동적으로 생성합니다.
    items.forEach(function(item) {
        var li = document.createElement('li');
        li.className = 'checklist-item';

        var checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = item.id;

        var label = document.createElement('label');
        label.htmlFor = item.id;
        label.textContent = item.text;
        // 원본 텍스트 저장 (체크 해제 시 복원 용도)
        label.dataset.originalText = item.text;

        li.appendChild(checkbox);
        li.appendChild(label);
        checklist.appendChild(li);
    });

    // 체크박스 체크/해제 시 스타일과 이모지 업데이트
    checklist.addEventListener('change', function(event) {
        if (event.target && event.target.matches('input[type="checkbox"]')) {
            var checkbox = event.target;
            var label = checkbox.nextElementSibling;
            if (checkbox.checked) {
                label.classList.add('checked');
                label.innerHTML = label.dataset.originalText + " ✅";
            } else {
                label.classList.remove('checked');
                label.innerHTML = label.dataset.originalText;
            }
        }
    });
});
