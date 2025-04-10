document.addEventListener('DOMContentLoaded', function() {

    // 쿠키 처리 유틸리티 함수
    function setCookie(name, value, days) {
        var expires = "";
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "") + expires + "; path=/";
    }

    function getCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for(var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    // [진규]의 체크리스트 섹션 (변경 전 그대로)
    var defaultSections = [
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

    // [민경]용 새 체크리스트 섹션
    var minkyungSections = [
        {
            title: "기본",
            items: [
                { id: 'm_item1', text: '여권/복사본' },
                { id: 'm_item2', text: '신분증' },
                { id: 'm_item3', text: '항공권/복사본' },
                { id: 'm_item4', text: '카드(트레블월렛, 트레블로그, 한국용카드)' },
                { id: 'm_item5', text: '대만돈 + 동전지갑' },
                { id: 'm_item6', text: '충전선 usb타입, c타입, c투c, 애플워치충전기' },
                { id: 'm_item7', text: '보조배터리' },
                { id: 'm_item8', text: '들고다니는 가방' },
                { id: 'm_item9', text: '칙칙이, 알갱이, 리스테린종이' },
                { id: 'm_item10', text: '칫솔치약' },
                { id: 'm_item11', text: '림밤용 거울' },
                { id: 'm_item12', text: '셀카봉' },
                { id: 'm_item13', text: '선그리/안경' },
                { id: 'm_item14', text: '우산' },
                { id: 'm_item15', text: '향' }
            ]
        },
        {
            title: "의복",
            items: [
                { id: 'm_item16', text: '1일 검나시, 청치마, 여름이가디건' },
                { id: 'm_item17', text: '2일 흰나시, 체크치마, 봄가디건' },
                { id: 'm_item18', text: '3일 출입국날 같은 히피체크 or 파란셔츠 챙길것' },
                { id: 'm_item19', text: '팬티 4개, 브라 3개, 흰티1개' },
                { id: 'm_item20', text: '양말' },
                { id: 'm_item21', text: '잠옷용 검반팔, 잠옷바지' }
            ]
        },
        {
            title: "세안",
            items: [
                { id: 'm_item22', text: '샴푸, 트리트먼트' },
                { id: 'm_item23', text: '클렌징폼, 클렌징오일, 로션' },
                { id: 'm_item24', text: '바디로션 더 소분' },
                { id: 'm_item25', text: '샴푸 통 씻고 지금거 담을지 고민' }
            ]
        },
        {
            title: "헤어",
            items: [
                { id: 'm_item26', text: '롤빗(진규도 내꺼써)' },
                { id: 'm_item27', text: '왕빗' },
                { id: 'm_item28', text: '헤어롤' },
                { id: 'm_item29', text: '고데기' },
                { id: 'm_item30', text: '헤어에센스' }
            ]
        },
        {
            title: "화장",
            items: [
                { id: 'm_item31', text: '렌즈 5쌍' },
                { id: 'm_item32', text: '화장품 내일아침에 가방에 챙기기' }
            ]
        }
    ];

    // 현재 선택된 사람의 기본값: "진규"
    var currentPerson = "진규";

    // 체크리스트 컨테이너 및 사람 선택 드롭다운
    var container = document.getElementById('checklistContainer');
    if (!container) {
        console.error("체크리스트 컨테이너(div#checklistContainer)를 찾을 수 없습니다.");
        return;
    }
    var personSelect = document.getElementById('personSelect');
    if (!personSelect) {
        console.error("사람 선택 드롭다운(select#personSelect)를 찾을 수 없습니다.");
        return;
    }

    // 초기 UI 로드
    loadUI(currentPerson);

    // 사람 선택 변경 시 UI 재로딩
    personSelect.addEventListener('change', function(event) {
        currentPerson = event.target.value;
        loadUI(currentPerson);
    });

    // UI 로드: 현재 선택한 사람에 따른 쿠키를 읽어와서 UI를 구성
    function loadUI(person) {
        // 쿠키 키 예: checklistState_진규 또는 checklistState_민경
        var cookieKey = "checklistState_" + person;
        var cookieState = getCookie(cookieKey);
        var checklistState = cookieState ? JSON.parse(cookieState) : {};
        container.innerHTML = "";  // 기존 UI 초기화

        // 선택한 사람에 따라 사용할 섹션 배열 결정
        var sections = (person === "민경") ? minkyungSections : defaultSections;
        buildUI(sections, checklistState);
    }

    // UI 구성 함수: 섹션 배열과 저장된 체크 상태를 반영하여 체크리스트 생성
    function buildUI(sections, savedState) {
        sections.forEach(function(section) {
            var header = document.createElement('h2');
            header.className = 'section-header';
            header.textContent = section.title;
            container.appendChild(header);

            var ul = document.createElement('ul');
            section.items.forEach(function(item) {
                var li = document.createElement('li');
                li.className = 'checklist-item';

                var checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.id = item.id;
                if (savedState[item.id]) {
                    checkbox.checked = true;
                }

                var label = document.createElement('label');
                label.htmlFor = item.id;
                label.textContent = item.text;
                label.dataset.originalText = item.text;
                if (checkbox.checked) {
                    label.classList.add('checked');
                    label.innerHTML = label.dataset.originalText + " ✅";
                }

                li.appendChild(checkbox);
                li.appendChild(label);
                ul.appendChild(li);
            });
            container.appendChild(ul);
        });
    }

    // 체크박스 변경 이벤트 처리: 변화 시 해당 사람의 쿠키 업데이트
    container.addEventListener('change', function(event) {
        if (event.target && event.target.matches('input[type="checkbox"]')) {
            var checkbox = event.target;
            var label = checkbox.nextElementSibling;
            var cookieKey = "checklistState_" + currentPerson;
            var cookieState = getCookie(cookieKey);
            var checklistState = cookieState ? JSON.parse(cookieState) : {};
            checklistState[checkbox.id] = checkbox.checked;
            setCookie(cookieKey, JSON.stringify(checklistState), 100);

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
