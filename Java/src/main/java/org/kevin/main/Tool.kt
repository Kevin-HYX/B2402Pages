package org.kevin.main

import java.util.*

fun main() {
    val text = """
        <script src = "https://cdn.jsdelivr.net/gh/Kevin-HYX/B2402Pages/js/Leader2.0.js"></script>
    """.trimIndent()
    println(Base64.getEncoder().encode(text.toByteArray()))
}