// script.js
$(document).ready(function () {
    $('#golfForm').on('submit', function (event) {
        event.preventDefault();

        var numPlayers = parseInt($('#numPlayers').val()) || 0;
        var numRounds = parseInt($('#numRounds').val()) || 0;
        var numNights = parseInt($('#numNights').val()) || 0;
        var numRooms = parseInt($('#numRooms').val()) || 0;
        var useRentalCar = $('#useRentalCar').is(':checked');

        var feePerPlayer = 10000; // 골프 인원 1인당 1만원
        var feePerRound = 10000;  // 라운딩 1회당 1만원
        var feePerNight = 10000;  // 1박당 1만원
        var feePerRoom = 10000;   // 방 1개당 1만원
        var rentalCarFee = 10000; // 렌트카 사용시 1만원

        // 골프 수수료는 인원 * 라운딩 횟수 * 1만원
        var golfFee = numPlayers * numRounds * feePerPlayer;
        // 숙박 수수료는 1박당 1만원 * 방 갯수
        var lodgingFee = numNights * numRooms * feePerNight;
        var totalFee = golfFee + lodgingFee;

        if (useRentalCar) {
            totalFee += rentalCarFee;
        }

        var discountApplied = false;

        // 할인 적용
        if (numPlayers >= 8 || numNights >= 10) {
            totalFee *= 0.7; // 30% 할인 적용
            discountApplied = true;
        }

        $('#result').text("전체 수수료: " + totalFee.toLocaleString() + " 원");

        if (discountApplied) {
            $('#discountMessage').text("할인이 적용되었습니다.");
        } else {
            $('#discountMessage').text("");
        }

        // 리셋 버튼 표시
        $('#resetButton').show();
    });

    $('#resetButton').on('click', function () {
        $('#golfForm')[0].reset();
        $('#result').text("");
        $('#discountMessage').text("");
        $(this).hide(); // 리셋 버튼 숨기기
    });
});
