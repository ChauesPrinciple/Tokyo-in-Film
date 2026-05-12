
"""Japan Travel Phrase Card Generator

Creates a printable phrase card with essential Japanese travel phrases.
"""

import textwrap
from dataclasses import dataclass
from pathlib import Path
from typing import List

import matplotlib.pyplot as plt
from matplotlib import font_manager as fm
from matplotlib.axes import Axes
from matplotlib.figure import Figure
from matplotlib.font_manager import FontProperties
from matplotlib.patches import FancyBboxPatch

# Register Yu Gothic Medium directly from the Windows font file.
# Using addfont + FontProperties(fname=) bypasses matplotlib's font-name
# lookup, which silently fails to load CJK glyphs on some builds.
_JP_FONT_FILE = r'C:\Windows\Fonts\YuGothM.ttc'
fm.fontManager.addfont(_JP_FONT_FILE)
JP_FONT = FontProperties(fname=_JP_FONT_FILE)


# ===== CONFIGURATION =====
OUTPUT_PATH = Path.home() / 'Downloads' / 'japan_travel_phrase_card.png'
FIGURE_SIZE = (9, 15)
DPI = 300

# Layout constants
CARD_START_Y = 12.5
CARD_HEIGHT = 1.55
CARD_STEP = 1.85
TEXT_WRAP_WIDTH = 32
TIP_BOX_WIDTH = 2.7

# Colors
BG_COLOR = '#FDFCFA'
HEADER_COLOR = '#A69076'
TITLE_COLOR = '#2C2C2C'
SUBTITLE_COLOR = '#999999'
FOOTER_BG = '#F0EBE3'
FOOTER_BORDER = '#D5CFC5'

# Footer tips — one string per line
FOOTER_TIPS = [
    'Bow slightly when saying thanks or sorry',
    'Pointing is okay when paired with "kore wo kudasai"',
    'Google Translate works great in Japan',
]


# ===== DATA MODEL =====
@dataclass(frozen=True)
class Phrase:
    en: str
    jp: str
    rom: str
    meaning: str
    usage: str
    color: str


# ===== PHRASE DATA =====
PHRASES: List[Phrase] = [
    Phrase(
        en='Sumimasen',
        jp='すみません',
        rom='soo-mee-mah-sen',
        meaning='Excuse me / Sorry / Thank you (for service)',
        usage='Get attention, apologize, or express gratitude in advance. The Swiss Army knife of Japanese.',
        color='#C75B39',
    ),
    Phrase(
        en='Kore wo kudasai',
        jp='これをください',
        rom='koh-reh oh koo-dah-sah-ee',
        meaning='This, please',
        usage='Point at anything—menu item, product, ticket—and say this. Works everywhere.',
        color='#4A7C59',
    ),
    Phrase(
        en='Eigo wa daijoubu desu ka?',
        jp='英語は大丈夫ですか？',
        rom='ay-goh wah dye-joh-boo dess kah',
        meaning='Is English okay?',
        usage='Ask before assuming someone speaks English. Shows respect and saves awkwardness.',
        color='#5B7BA3',
    ),
    Phrase(
        en='Arigatou gozaimasu',
        jp='ありがとうございます',
        rom='ah-ree-gah-toh go-zai-mahs',
        meaning='Thank you (polite)',
        usage='After every interaction. Cashiers, servers, anyone who helps you.',
        color='#B8860B',
    ),
    Phrase(
        en='___ wa doko desu ka?',
        jp='＿＿＿はどこですか？',
        rom='___ wah doh-koh dess kah',
        meaning='Where is ___?',
        usage='Fill the blank: "Toire" (toilet), "Eki" (station), "Konbini" (convenience store).',
        color='#6B4C7A',
    ),
    Phrase(
        en='Wakarimasen',
        jp='わかりません',
        rom='wah-kah-ree-mah-sen',
        meaning="I don't understand",
        usage='Honest and universally understood. Better than nodding along confused.',
        color='#8B4513',
    ),
]


# ===== DRAWING =====
def setup_figure() -> tuple[Figure, Axes]:
    """Create and configure the figure and axes."""
    fig, ax = plt.subplots(figsize=FIGURE_SIZE)
    ax.set_xlim(0, 9)
    ax.set_ylim(0, 15)
    ax.axis('off')
    fig.patch.set_facecolor(BG_COLOR)
    ax.set_facecolor(BG_COLOR)
    return fig, ax


def draw_header(ax: Axes) -> None:
    """Draw the card header with title and subtitle."""
    ax.text(4.5, 14.4, 'JAPAN TRAVEL', fontsize=12, fontweight='bold',
            ha='center', va='center', color=HEADER_COLOR)
    ax.text(4.5, 13.9, 'Essential Phrase Card', fontsize=26, fontweight='bold',
            ha='center', va='center', color=TITLE_COLOR)
    ax.text(4.5, 13.5, f'{len(PHRASES)} phrases to navigate Japan with confidence',
            fontsize=11, ha='center', va='center', color=SUBTITLE_COLOR, fontstyle='italic')
    ax.plot([2, 7], [13.2, 13.2], color='#E0D5C7', linewidth=1.5)


def draw_phrase_card(ax: Axes, phrase: Phrase, index: int, y_top: float) -> None:
    """Draw a single phrase card at the specified Y position."""
    y_center = y_top - CARD_HEIGHT / 2
    num_label = f'{index + 1:02d}'

    ax.add_patch(FancyBboxPatch(
        (0.7, y_top - CARD_HEIGHT), 7.6, CARD_HEIGHT,
        boxstyle="round,pad=0.02,rounding_size=0.2",
        facecolor='white', edgecolor='#E5E0D8', linewidth=1.3,
    ))

    ax.add_patch(FancyBboxPatch(
        (1.0, y_center - 0.22), 0.5, 0.44,
        boxstyle="round,pad=0.02,rounding_size=0.15",
        facecolor=phrase.color, alpha=0.12, edgecolor='none',
    ))
    ax.text(1.25, y_center, num_label, fontsize=11, fontweight='bold',
            ha='center', va='center', color=phrase.color)

    ax.text(1.8, y_top - 0.35, phrase.jp, fontsize=15, fontweight='bold',
            ha='left', va='center', color='#1A1A1A', fontproperties=JP_FONT)
    ax.text(1.8, y_top - 0.68, phrase.en, fontsize=12, fontweight='bold',
            ha='left', va='center', color=phrase.color)
    ax.text(1.8, y_top - 0.98, phrase.rom, fontsize=9, ha='left', va='center',
            color='#AAAAAA', fontstyle='italic')
    ax.text(1.8, y_top - 1.25, f'→ {phrase.meaning}', fontsize=9, ha='left', va='center',
            color='#666666')

    tip_lines = textwrap.wrap(phrase.usage, width=TEXT_WRAP_WIDTH)
    line_h = 0.22
    v_pad = 0.12
    box_h = len(tip_lines) * line_h + v_pad * 2
    box_bottom = y_center - box_h / 2

    ax.add_patch(FancyBboxPatch(
        (5.2, box_bottom), TIP_BOX_WIDTH, box_h,
        boxstyle="round,pad=0.02,rounding_size=0.15",
        facecolor='#F7F5F1', edgecolor='#EDEAE4', linewidth=0.8,
    ))

    tip_y = box_bottom + box_h - v_pad - line_h / 2
    for line in tip_lines:
        ax.text(5.35, tip_y, line, fontsize=8.5, ha='left', va='center', color='#777777')
        tip_y -= line_h


def draw_footer(ax: Axes) -> None:
    """Draw the footer with pro tips."""
    footer_y = 1.3
    tip_line_h = 0.21
    n_tips = len(FOOTER_TIPS)
    box_h = 0.45 + n_tips * tip_line_h + 0.3  # header + tips + save-text row
    box_bottom = footer_y - box_h + 0.45

    ax.add_patch(FancyBboxPatch(
        (0.7, box_bottom), 7.6, box_h,
        boxstyle="round,pad=0.02,rounding_size=0.2",
        facecolor=FOOTER_BG, edgecolor=FOOTER_BORDER, linewidth=1,
    ))
    ax.text(4.5, footer_y + 0.25, 'PRO TIPS', fontsize=10, fontweight='bold',
            ha='center', va='center', color='#8B7355')

    tip_y = footer_y + 0.05
    for tip in FOOTER_TIPS:
        ax.text(4.5, tip_y, tip, fontsize=8.5, ha='center', va='center', color='#666666')
        tip_y -= tip_line_h

    ax.text(4.5, tip_y - 0.04, 'Save to your phone  |  Print and fold into your wallet',
            fontsize=8, ha='center', va='center', color='#AAAAAA')


def save_card(fig: Figure, output_path: Path = OUTPUT_PATH) -> None:
    """Save the card to the specified output path."""
    output_path.parent.mkdir(parents=True, exist_ok=True)
    fig.savefig(output_path, dpi=DPI, bbox_inches='tight',
                facecolor=BG_COLOR, edgecolor='none')
    print(f'Saved to: {output_path}')


def main() -> None:
    """Main function to generate the phrase card."""
    fig, ax = setup_figure()
    draw_header(ax)

    for i, phrase in enumerate(PHRASES):
        draw_phrase_card(ax, phrase, i, y_top=CARD_START_Y - i * CARD_STEP)

    draw_footer(ax)
    plt.tight_layout()
    save_card(fig)
    plt.show()


if __name__ == '__main__':
    main()
