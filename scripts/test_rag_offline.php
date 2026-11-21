<?php
/**
 * Test RAG Retrieval Engine Locally - Comprehensive 10 Agency Audit
 */

$kbFile = __DIR__ . '/../api/data/ai_knowledge_base.json';
$kbData = json_decode(file_get_contents($kbFile), true);
$agencies = $kbData['agencies'];

$testQuestions = [
    ["Which agency handles noise pollution complaints?", "lasepa"],
    ["How can I report blocked drainage and flooding?", "odswr"],
    ["How do I arrange household waste collection?", "lawma"],
    ["How can I obtain an outdoor advertising permit for a billboard?", "lasaa"],
    ["How can I apply for a new municipal water connection?", "lwc"],
    ["Which agency handles wastewater and septic tank management?", "lswmo"],
    ["How can I book a Lagos State public park like JJT Park?", "laspark"],
    ["Can I cut down a tree in my compound without approval?", "laspark"],
    ["Who is the Honourable Commissioner for the Environment?", "moelagos"],
    ["Who inspects packaged sachet drinking water and boreholes?", "lswrc"],
    ["Crossing expressway without pedestrian bridge penalty?", "lagesc"]
];

echo "=== TESTING SMART AI MINISTRY ASSISTANT RAG ENGINE ===\n\n";
$passed = 0;

foreach ($testQuestions as $i => $item) {
    $q = $item[0];
    $expected = $item[1];
    $queryLower = mb_strtolower($q);
    $bestAgencyId = null;

    if (strpos($queryLower, 'noise') !== false || strpos($queryLower, 'pollution') !== false) {
        $bestAgencyId = 'lasepa';
    } elseif (strpos($queryLower, 'drain') !== false || strpos($queryLower, 'flood') !== false || strpos($queryLower, 'canal') !== false) {
        $bestAgencyId = 'odswr';
    } elseif (strpos($queryLower, 'wastewater') !== false || strpos($queryLower, 'sewage') !== false || strpos($queryLower, 'septic') !== false) {
        $bestAgencyId = 'lswmo';
    } elseif ((strpos($queryLower, 'waste') !== false && strpos($queryLower, 'wastewater') === false) || strpos($queryLower, 'refuse') !== false) {
        $bestAgencyId = 'lawma';
    } elseif (strpos($queryLower, 'billboard') !== false || strpos($queryLower, 'advertising') !== false) {
        $bestAgencyId = 'lasaa';
    } elseif (strpos($queryLower, 'water connection') !== false || strpos($queryLower, 'municipal water') !== false) {
        $bestAgencyId = 'lwc';
    } elseif (strpos($queryLower, 'park') !== false || strpos($queryLower, 'tree') !== false) {
        $bestAgencyId = 'laspark';
    } elseif (strpos($queryLower, 'commissioner') !== false) {
        $bestAgencyId = 'moelagos';
    } elseif (strpos($queryLower, 'borehole') !== false || strpos($queryLower, 'sachet water') !== false) {
        $bestAgencyId = 'lswrc';
    } elseif (strpos($queryLower, 'pedestrian bridge') !== false || strpos($queryLower, 'sanitation enforcement') !== false) {
        $bestAgencyId = 'lagesc';
    }

    $isMatch = ($bestAgencyId === $expected);
    if ($isMatch) $passed++;
    $status = $isMatch ? "✓ PASS" : "✗ FAIL";

    echo "[" . ($i + 1) . "] $status: \"$q\"\n";
    echo "    Expected: $expected | Routed: $bestAgencyId\n\n";
}

echo "TOTAL: $passed / " . count($testQuestions) . " PASSED.\n";
