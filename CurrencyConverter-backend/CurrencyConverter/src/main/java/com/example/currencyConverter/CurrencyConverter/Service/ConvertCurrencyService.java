package com.example.currencyConverter.CurrencyConverter.Service;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.beans.factory.annotation.Value;

import java.util.Map;

@Service
public class ConvertCurrencyService {

    @Value("${exchange.api.key}")
    private String apiKey;

    private final String BASE_URL = "https://v6.exchangerate-api.com/v6/";

    public double convertCurrency(String from, String to, double amount) {
        String url = BASE_URL + apiKey + "/latest/" + from;

        RestTemplate restTemplate = new RestTemplate();
        Map<String, Object> response = restTemplate.getForObject(url, Map.class);
        Map<String, Double> rates = (Map<String, Double>) response.get("conversion_rates");

        if (rates == null || !rates.containsKey(to)) {
            throw new RuntimeException("Invalid currency code or API response");
        }

        double rate = rates.get(to);
        return amount * rate;
    }
}
