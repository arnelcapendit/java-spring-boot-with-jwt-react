package com.javatraining.todomanagement.controller;

public class Test  implements Class1, Class2{

    public static void main(String[] args) {


        String testWord = "iamprofitabletrader";
        char[] testWordCharArray = testWord.toCharArray();

//        System.out.println(testWordCharArray.length);

//        StringBuilder sb = new StringBuilder();
//        System.out.println("reverse world: " + sb.append(testWord).reverse());
        String reverseWord = "";
//
//        for(int i = 0; i < testWordCharArray.length; i++) {
//            reverseWorld = String.valueOf(testWordCharArray[i]) + reverseWorld;
//            System.out.println(reverseWorld);
//        }

//        for(int x = testWordCharArray.length - 1; x >= 0; x--) {
//            reverseWord = String.valueOf(testWordCharArray[x]) + reverseWord;
//        }
//
//
//        System.out.println(reverseWord);

        Class1 test1 = new Test();
        test1.walk();
    }

    @Override
    public void walk() {
        System.out.println("testing");
    }
}


interface Class1 {
    void walk();
}

interface Class2 {
    void walk();
}
