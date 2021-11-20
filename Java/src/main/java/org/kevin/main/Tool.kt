package org.kevin.main

import java.io.File
import java.util.*
import java.util.regex.Pattern

fun main() {
    val scanner = Scanner(File("D:\\Kevin's Java\\B2402Pages\\Java\\src\\main\\java\\org\\kevin\\main\\birthday.txt").bufferedReader())
    val buffer = StringBuffer("[")
    var i = 1
    while (scanner.hasNextLine()){
        val line = scanner.nextLine()
        val split = line.split("\t")
        buffer.append("""
            {
            "id":${i++},
            "name":"${split[0]}",
            "month":${split[1]}
            },
        """.trimIndent())
    }
    buffer.removeSuffix(",")
    buffer.append("]")
    val jsonFile = File("D:\\Kevin's Java\\B2402Pages\\Java\\src\\main\\java\\org\\kevin\\main\\birthday.json")
    jsonFile.createNewFile()
    jsonFile.writeText(buffer.toString())



}