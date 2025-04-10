document.addEventListener('DOMContentLoaded', function() {
    // 각 섹션별 항목들을 구성합니다.
    var sections = [
        {
            title: "기본",
            items: [
                { id: 'item1', text: '여권 -프린트' },
                { id: 'item2', text: 'e심' },
                { id: 'item3', text: '보험증확인' },
                { id: 'item4', text: '항공권(스마트패스/전자거시기)' },
                { id: 'item5', text: '숙소확인 -프린트' },
                { id: 'item6', text: '트래블카드' },
                { id: 'item7', text: '현금 - 민경이' },
                { id: 'item8', text: '워치' },
                { id: 'item9', text: '의약품(타이레놀, 소화제)' },
                { id: 'item10', text: '어댑터(변환기 2개 가져감)' },
                { id: 'item11', text: '충전기(라이트닝/C/워치)' },
                { id: 'item12', text: '(충전중) 보조배터리' },
                { id: 'item13', text: '돈지갑' },
                { id: 'item14', text: '휴대가방(매는거)' },
                { id: 'item15', text: '안경' },
                { id: 'item16', text: '임냄셰' },
                { id: 'item17', text: '인공눈물' },
                { id: 'item18', text: '셀카봉 - 민경이' },
                { id: 'item19', text: '선구리' }
            ]
        },
        {
            title: "화장품",
            items: [
                { id: 'item20', text: '칫솔세트' },
                { id: 'item21', text: '면도기(최근구매)' },
                { id: 'item22', text: '면도크림' },
                { id: 'item23', text: '컨실러' },
                { id: 'item24', text: '로션' },
                { id: 'item25', text: '보습썬크림' },
                { id: 'item26', text: '향수(소분)' },
                { id: 'item27', text: '렌즈 3쌍 / 1쌍(착용)' }
            ]
        },
        {
            title: "의복",
            items: [
                { id: 'item28', text: '검폴로반팔 / 여름청' },
                { id: 'item29', text: '칼하트 / 청반바지' },
                { id: 'item30', text: '하늘색 셔츠 / 브라운반바지' },
                { id: 'item31', text: '잠옷 세트(반팔/강쥐바지)' },
                { id: 'item32', text: '민무늬 이너반팔 2벌' }
            ]
        }
    ];

    // 모든 섹션을 담을 컨테이너 선택
    var container = document.getElementById('checklistContainer');
    if (!container) {
        console.error("체크리스트 컨테이너(div#checklistContainer)를 찾을 수 없습니다.");
        return;
    }

    // 각 섹션에 대해 처리
    sections.forEach(function(section) {
        // 섹션 제목(카테고리 헤더) 생성 및 추가
        var header = document.createElement('h2');
        header.className = 'section-header';
        header.textContent = section.title;
        container.appendChild(header);

        // 섹션 내부의 체크리스트 항목을 포함할 목록 생성
        var ul = document.createElement('ul');
        section.items.forEach(function(item) {
            var li = document.createElement('li');
            li.className = 'checklist-item';

            // 체크박스 생성
            var checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.id = item.id;

            // 레이블 생성
            var label = document.createElement('label');
            label.htmlFor = item.id;
            label.textContent = item.text;
            // 원본 텍스트 저장 (체크 해제 시 복원 용도)
            label.dataset.originalText = item.text;

            li.appendChild(checkbox);
            li.appendChild(label);
            ul.appendChild(li);
        });
        container.appendChild(ul);
    });

    // 이벤트 위임: 체크박스 체크/해제 시 스타일과 이모지 업데이트
    container.addEventListener('change', function(event) {
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
