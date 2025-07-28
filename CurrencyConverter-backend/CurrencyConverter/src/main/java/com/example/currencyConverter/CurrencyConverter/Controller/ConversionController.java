package com.example.currencyConverter.CurrencyConverter.Controller;

import com.example.currencyConverter.CurrencyConverter.Service.ConvertCurrencyService;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping(("/api"))
public class ConversionController {

    @Autowired
    private ConvertCurrencyService service;

    @GetMapping("/convert")
    public double convert(@RequestParam String from, @RequestParam String to, @RequestParam double amount){

        double result = service.convertCurrency(from,to,amount);
        return result;
    }
}
