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
        var feePerNight = 10000;  // 1박당 1만원
        var rentalCarFee = 10000; // 렌트카 사용시 1만원

        // 골프 수수료는 인원 * 라운딩 횟수 * 1만원
        var golfFee = numPlayers * numRounds * feePerPlayer;

        var discountApplied = false;

        // 골프 인원 8명 이상 또는 숙박 일수 10일 이상일 때 할인 적용
        if (numPlayers >= 8 || numNights >= 10) {
            golfFee *= 0.7; // 골프 및 라운딩 횟수에 따른 금액의 30% 할인 적용
            discountApplied = true;
        }

        // 숙박 수수료는 1박당 1만원 * 방 갯수
        var lodgingFee = numNights * numRooms * feePerNight;
        var totalFee = golfFee + lodgingFee;

        if (useRentalCar) {
            totalFee += rentalCarFee;
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
