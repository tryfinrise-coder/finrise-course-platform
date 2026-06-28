"use server";

import { getCurrentUser } from "@/lib/auth";
import { queryOne } from "@/lib/db";
import { ownsProduct } from "@/lib/entitlements";
import { markLessonComplete } from "@/lib/progress";
import { awardLessonCompletion, type RewardResult } from "@/lib/gamification";
import type { Lesson } from "@/lib/types";

// Mark a lesson complete — only if the caller actually owns the lesson's
// product — then award XP/streak/badges. Returns the reward so the client can
// play the celebration. Returns null when not eligible.
export async function markLessonCompleteAction(
  lessonId: number
): Promise<RewardResult | null> {
  const user = await getCurrentUser();
  if (!user) return null;

  const lesson = await queryOne<Lesson>("SELECT * FROM lessons WHERE id = ?", [
    lessonId,
  ]);
  if (!lesson) return null;

  if (user.role !== "admin" && !(await ownsProduct(user.id, lesson.product_id)))
    return null;

  const { firstTime } = await markLessonComplete(user.id, lessonId);
  if (!firstTime) {
    return {
      awarded: false,
      xpGained: 0,
      totalXp: 0,
      level: 0,
      prevLevel: 0,
      leveledUp: false,
      progress: 0,
      streak: 0,
      dailyCount: 0,
      dailyGoal: 0,
      dailyGoalMet: false,
      goalJustMet: false,
      newBadges: [],
    };
  }

  return awardLessonCompletion(user.id);
}
